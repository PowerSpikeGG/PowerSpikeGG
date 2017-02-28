import json
import logging
import os
import requests
import sys
import threading
import time
import unittest

if sys.version_info > (3, 0):
    from http.server import HTTPServer
    from http.server import SimpleHTTPRequestHandler
    from urllib.parse import quote_plus
else:
    from BaseHTTPServer import HTTPServer
    from SimpleHTTPServer import SimpleHTTPRequestHandler
    from io import open  # Support the error handling on open function.
    from urllib import quote_plus

from third_party.python.riotwatcher import riotwatcher


"""
Test if the RiotWatcher correctly manage to fetch data from the Riot API.

Basically, this test suite will only run on sample data fetched from the Riot
API. If you want to run this test suite directly on the Riot API, you may want
to specify your API Key in your environment such as:

    RIOT_API_KEY="my-api-key" python test.py

As an important note for those tests, if you are running tests using a Riot API
token:
    - if the tested summoner does not have ranked teams games, teams tests will
      fail.
    - if the tested summoner does not have ranked stats, stats tests will fail.

These are not graceful failure, so try to use a summoner that has them.
"""


class FakeRiotAPIRequestHandler(SimpleHTTPRequestHandler):
    """Fake HTTP server, serving sample data."""

    # This must be bind before the request is done. It contains the data to
    # serve from the handler.
    data_to_serve = None

    # Default response code is set to 200, but may be modified if needed.
    response_code = 200

    # This is field is filled when a request is done. Allow to check if the
    # client requested the expected route.
    http_route = None

    def do_GET(self):
        """Serve the data and register the route used."""
        self.send_response(self.response_code)
        self.end_headers()
        if self.data_to_serve is not None:
            self.wfile.write(self.data_to_serve.encode('ascii'))

        # Register the path into the class, since this instance will be
        # destroyed after the request is handled.
        FakeRiotAPIRequestHandler.http_route = self.path


class LocalRiotWatcher(riotwatcher.RiotWatcher):
    """Override the url formater to target the local http server."""

    server_address = None
    enable_https = False

    def format_base_url(self, region, static):
        """Format the URL to reach the local server"""
        assert self.server_address is not None

        return '{server_address}'.format(
            server_address=self.server_address,
        )


class RiotWatcherLocalTest(unittest.TestCase):
    """Riot Watcher test, on sample data fetched from the Riot API.

    This test suite does not reach the official Riot API. This is used to test
    the module in "offline mode", avoiding the commit on Github of a Riot API
    key ;).

    If you are doing changes on this module, please also run the online tests.
    """

    server_address = None
    handler = FakeRiotAPIRequestHandler
    sample_data = {"somekey": "somevalue"}

    @classmethod
    def setUpClass(cls):
        """Create and serve a fake HTTP server. Also instantiate a client"""
        cls.httpd = HTTPServer(("127.0.0.1", 0), cls.handler)
        cls.server_address = cls.httpd.socket.getsockname()
        cls.running_thread = threading.Thread(target=cls.httpd.serve_forever)
        cls.running_thread.start()

        # Since we are running a local server, we can avoid limitation.
        cls.client = LocalRiotWatcher("some random token", limits=[])
        cls.client.server_address = "%s:%s" % cls.server_address

    @classmethod
    def tearDownClass(cls):
        """Close the fake HTTP server."""
        cls.httpd.shutdown()
        cls.httpd.server_close()
        cls.running_thread.join()

    def setUp(self):
        """Reset the handler."""
        self.handler.data_to_serve = json.dumps(self.sample_data)
        self.handler.response_code = 200

        # Reset the route parameter, so we can know if the client hit the
        # server.
        self.handler.http_route = None

    def test_fake_server_working(self):
        """Simple test checking the fake server works correctly."""
        response = requests.get("http://%s:%s/hello" % self.server_address)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, json.dumps(self.sample_data))
        self.assertEqual(self.handler.http_route, "/hello")

    def assertValidResults(self, expected_route, result):
        """Utility assertion checking if the API is valid.

        This function will check the right route is hit and the API returned
        valid values.

        Parameters:
            expected_route: expected route (before the GET parameters)
            result: result returned from the watcher.
        """
        actual_route = self.handler.http_route.partition("?")[0]
        self.assertEqual(actual_route, expected_route)
        self.assertEqual(result, self.sample_data)

    def test_region_parameter_supported(self):
        """Test the 'region' parameter is supported in all methods.

        Since we are doing route checking for each method, we can simple check
        if the '/region/' is in the route sent to the server.
        """
        methods_and_arguments = [
            (self.client.get_all_champions, []),
            (self.client.get_champion, [1]),
            (self.client.get_recent_games, [1]),
            (self.client.get_league, [[1]]),
            (self.client.get_league_entry, [[1]]),
            (self.client.get_challenger, []),
            (self.client.get_master, []),
            (self.client.static_get_champion_list, []),
            (self.client.static_get_champion, [1]),
            (self.client.static_get_item_list, []),
            (self.client.static_get_item, [1]),
            (self.client.static_get_mastery_list, []),
            (self.client.static_get_mastery, [1]),
            (self.client.static_get_realm, []),
            (self.client.static_get_rune_list, []),
            (self.client.static_get_rune, [1]),
            (self.client.static_get_summoner_spell_list, []),
            (self.client.static_get_summoner_spell, [1]),
            (self.client.static_get_versions, []),
            (self.client.get_match, [1]),
            (self.client.get_match_list, [1]),
            (self.client.get_stat_summary, [1]),
            (self.client.get_ranked_stats, [1]),
            (self.client.get_mastery_pages, [[1]]),
            (self.client.get_rune_pages, [[1]]),
            (self.client.get_summoners, [["foo"]]),
            (self.client.get_summoner, ["foo"]),
            (self.client.get_summoner_name, [[1]]),
            (self.client.get_teams_for_summoners, [[1]]),
            (self.client.get_teams, [[1]])
        ]

        for method, args in methods_and_arguments:
            method(*args, region=riotwatcher.EUROPE_WEST)
            route = self.handler.http_route.partition("?")[0]
            self.assertTrue(
                '/{region}/'.format(region=riotwatcher.EUROPE_WEST) in route)

        # Since there is a small post-processing on the output, we need to
        # modify the content the server should send back for the following
        # routes.
        self.handler.data_to_serve = json.dumps({"1": self.sample_data})
        self.client.get_teams_for_summoner(1, region=riotwatcher.EUROPE_WEST)
        route = self.handler.http_route.partition("?")[0]
        self.assertTrue('/{region}/'.format(region=riotwatcher.EUROPE_WEST)
            in route)
        self.client.get_team(1, region=riotwatcher.EUROPE_WEST)
        route = self.handler.http_route.partition("?")[0]
        self.assertTrue('/{region}/'.format(region=riotwatcher.EUROPE_WEST)
            in route)

    def format_route(self, target, sub_route="/", region=None):
        """Format the route as the Riot API standard route format.

        Riot API's routes are all formated as following:
            /api/lol/{region}/v{target's version}/{target}/...

        This utility function helps to format faster the routes.

        Parameters:
            target: name of the target. This MUST be defined in the
                api_versions in the module globals.
            sub_route: some routes needs specifications; you can define them
                here.
            region: if you want to use a specific region.
        """
        if target == 'static':
            version = riotwatcher.api_versions['lol-static-data']
        else:
            version = riotwatcher.api_versions[target]

        return '/{static}{region}/v{version}/{target}{sub_route}'.format(
            static='static-data/' if target == 'static' else '',
            region=self.client.default_region if region is None else region,
            version=version,
            target=target if target != 'static' else '',
            sub_route=sub_route,
        )

    def test_all_champion(self):
        """Test if the Champion API is correctly handled"""
        expected_route = self.format_route("champion")

        self.assertValidResults(expected_route,
            self.client.get_all_champions())

    def test_one_champion(self):
        """Test if we are correctly getting the data of a unique champion"""
        champion_id = 123
        expected_route = self.format_route("champion", "/{id}".format(
            id=champion_id,
        ))

        self.assertValidResults(expected_route,
            self.client.get_champion(champion_id))

    def test_recent_games(self):
        """Test if the client correctly handle recent games fetching."""
        summoner_id = 4242
        expected_route = self.format_route("game",
            "/by-summoner/{id}/recent".format(id=summoner_id))

        self.assertValidResults(expected_route,
            self.client.get_recent_games(summoner_id))

    def test_league_by_summoner(self):
        """Test if the client correctly handle league fetching for summoner."""
        summoner_ids = [4242]
        expected_route = self.format_route('league',
            '/by-summoner/{id}'.format(id=summoner_ids[0]))

        self.assertValidResults(expected_route,
            self.client.get_league(summoner_ids=summoner_ids))

    def test_league_by_teams(self):
        """Test if the client correctly handle league fetching for teams."""
        team_ids = [4242]
        expected_route = self.format_route('league',
            '/by-team/{id}'.format(id=team_ids[0]))

        self.assertValidResults(expected_route,
            self.client.get_league(team_ids=team_ids))

    def test_league_entry_by_summoner(self):
        """Test if the client correctly handle league entry for summoner."""
        summoner_ids = [4242]
        expected_route = self.format_route('league',
            '/by-summoner/{id}/entry'.format(id=summoner_ids[0]))

        self.assertValidResults(expected_route,
            self.client.get_league_entry(summoner_ids=summoner_ids))

    def test_league_by_teams(self):
        """Test if the client correctly handle league fetching for teams."""
        team_ids = [4242]
        expected_route = self.format_route('league',
            '/by-team/{id}/entry'.format(id=team_ids[0]))

        self.assertValidResults(expected_route,
            self.client.get_league_entry(team_ids=team_ids))

    def test_league_non_result_miss_use(self):
        """Test the client return a None result on miss use"""
        result = self.client.get_league(team_ids=[123], summoner_ids=[123])
        self.assertIsNone(result)
        self.assertIsNone(self.handler.http_route)  # The server was not hit.

    def test_league_entry_non_result_miss_use(self):
        """Test the client return a None result on miss use"""
        result = self.client.get_league_entry(team_ids=[123],
            summoner_ids=[123])
        self.assertIsNone(result)
        self.assertIsNone(self.handler.http_route)  # The server was not hit.

    def test_league_challenger(self):
        """Test the league challenger is correctly retrieve"""
        expected_route = self.format_route('league', '/challenger')

        self.assertValidResults(expected_route, self.client.get_challenger())

    def test_league_master(self):
        """Test the league master is correctly retrieve."""
        expected_route = self.format_route('league', '/master')

        self.assertValidResults(expected_route, self.client.get_master())

    def test_static_champion_list(self):
        """Test the champion list is correctly fetchable."""
        expected_route = self.format_route('static', 'champion')

        self.assertValidResults(expected_route,
            self.client.static_get_champion_list())

    def test_static_champion(self):
        """Test if a specific champion is correctly fetchable."""
        champion_id = 42
        expected_route = self.format_route('static', 'champion/{id}'.format(
            id=champion_id))

        self.assertValidResults(expected_route,
            self.client.static_get_champion(champion_id))

    def test_static_item_list(self):
        """Test if the item list is correctly fetchable."""
        expected_route = self.format_route('static', 'item')

        self.assertValidResults(expected_route,
            self.client.static_get_item_list())

    def test_static_item(self):
        """Test if a specific item is correctly fetchable."""
        item_id = 4242
        expected_route = self.format_route('static', 'item/{id}'.format(
            id=item_id))

        self.assertValidResults(expected_route,
            self.client.static_get_item(item_id))

    def test_static_mastery_list(self):
        """Test if the mastery list is correctly fetchable."""
        expected_route = self.format_route('static', 'mastery')

        self.assertValidResults(expected_route,
            self.client.static_get_mastery_list())

    def test_static_mastery(self):
        """Test if one mastery is correctly fetchable."""
        mastery_id = 4242
        expected_route = self.format_route('static', 'mastery/{id}'.format(
            id=mastery_id))

        self.assertValidResults(expected_route,
            self.client.static_get_mastery(mastery_id))

    def test_static_realm(self):
        """Test if realm are correctly fetchable."""
        expected_route = self.format_route('static', 'realm')

        self.assertValidResults(expected_route,
            self.client.static_get_realm())

    def test_static_rune_list(self):
        """Test if the rune list is correctly fetchable."""
        expected_route = self.format_route('static', 'rune')

        self.assertValidResults(expected_route,
            self.client.static_get_rune_list())

    def test_static_rune(self):
        """Test if one rune is correctly fetchable."""
        rune_id = 4242
        expected_route = self.format_route('static', 'rune/{id}'.format(
            id=rune_id))

        self.assertValidResults(expected_route,
            self.client.static_get_rune(rune_id))

    def test_static_summoner_spell_list(self):
        """Test if the list of summoner spells is correctly fetchable."""
        expected_route = self.format_route('static', 'summoner-spell')

        self.assertValidResults(expected_route,
            self.client.static_get_summoner_spell_list())

    def test_static_summoner_spell(self):
        """Test if one summoner spell is correctly fetchable."""
        summoner_spell_id = 4242
        expected_route = self.format_route('static',
            'summoner-spell/{id}'.format(id=summoner_spell_id))

        self.assertValidResults(expected_route,
            self.client.static_get_summoner_spell(summoner_spell_id))

    def test_static_versions(self):
        """Test if the versions are correctly fetchable."""
        expected_route = self.format_route('static', 'versions')

        self.assertValidResults(expected_route,
            self.client.static_get_versions())

    def test_match(self):
        """Test if a match is correctly fetchable."""
        match_id = 4242
        expected_route = self.format_route('match', '/{id}'.format(
            id=match_id))

        self.assertValidResults(expected_route,
            self.client.get_match(match_id))

    # TODO: include a test for the lol-status API.

    def test_match_list(self):
        """Test if match lists are correctly fetchable."""
        summoner_id = 4242
        expected_route = self.format_route('matchlist',
            '/by-summoner/{id}'.format(id=summoner_id))

        self.assertValidResults(expected_route,
            self.client.get_match_list(summoner_id))

    def test_stats_summary(self):
        """Test if stats summary are correctly fetchable."""
        summoner_id = 4242
        expected_route = self.format_route('stats',
            '/by-summoner/{id}/summary'.format(id=summoner_id))

        self.assertValidResults(expected_route,
            self.client.get_stat_summary(summoner_id))

    def test_stats_ranked(self):
        """Test if ranked stats are correctly fetchable."""
        summoner_id = 4242
        expected_route = self.format_route('stats',
            '/by-summoner/{id}/ranked'.format(id=summoner_id))

        self.assertValidResults(expected_route,
            self.client.get_ranked_stats(summoner_id))

    def test_summoner_mastery_page(self):
        """Test if summoner's mastery pages are correctly fetchable."""
        summoner_ids = [4242]
        expected_route = self.format_route('summoner',
            '/{ids}/masteries'.format(ids=summoner_ids[0]))

        self.assertValidResults(expected_route,
            self.client.get_mastery_pages(summoner_ids))

    def test_summoner_rune_pages(self):
        """Test if summoner's rune pages are correctly fetchable."""
        summoner_ids = [4242]
        expected_route = self.format_route('summoner',
            '/{ids}/runes'.format(ids=summoner_ids[0]))

        self.assertValidResults(expected_route,
            self.client.get_rune_pages(summoner_ids))

    def test_summoners_by_name(self):
        """Test if summoners can be fetched by name."""
        summoner_names = ["foo"]
        expected_route = self.format_route('summoner',
            '/by-name/{names}'.format(names=summoner_names[0].lower()))

        self.assertValidResults(expected_route,
            self.client.get_summoners(names=summoner_names))

    def test_summoners_by_utf8_name(self):
        """Test if summoners can be fetched by name."""
        summoner_names = ["YórickÅrchCrét"]
        expected_route = self.format_route('summoner',
            '/by-name/{names}'.format(
                names=quote_plus(summoner_names[0].lower())))

        self.assertValidResults(expected_route,
            self.client.get_summoners(names=summoner_names))

    def test_summoners_by_ids(self):
        """Test if summoners can be fetched by ids."""
        summoner_ids = [4242]
        expected_route = self.format_route('summoner',
            '/{ids}'.format(ids=summoner_ids[0]))

        self.assertValidResults(expected_route,
            self.client.get_summoners(ids=summoner_ids))

    def test_summoner_name(self):
        """Test if summoner names can be fetched from their ids."""
        summoner_ids = [4242]
        expected_route = self.format_route('summoner',
            '/{ids}/name'.format(ids=summoner_ids[0]))

        self.assertValidResults(expected_route,
            self.client.get_summoner_name(summoner_ids))

    def test_team_from_summoner(self):
        """Test if summoner's team is fetchable from its id."""
        summoner_id = 4242
        expected_route = self.format_route('team', '/by-summoner/{id}'.format(
            id=summoner_id))

        # Since there is a small post-processing on the output, we need to
        # modify the content the server should send back.
        self.handler.data_to_serve = json.dumps({str(summoner_id):
            self.sample_data})

        self.assertValidResults(expected_route,
            self.client.get_teams_for_summoner(summoner_id))

    def test_team_from_summoners(self):
        """Test if summoners' teams are fetchable from their ids."""
        summoner_ids = [4242, 4243]
        expected_route = self.format_route('team', '/by-summoner/{ids}'.format(
            ids=",".join(str(s) for s in summoner_ids)))

        self.assertValidResults(expected_route,
            self.client.get_teams_for_summoners(summoner_ids))

    def test_team_from_single_id(self):
        """Test if a team is fetchable from its id."""
        team_id = 4242
        expected_route = self.format_route('team', '/{id}'.format(id=team_id))

        # Since there is a small post-processing on the output, we need to
        # modify the content the server should send back.
        self.handler.data_to_serve = json.dumps({str(team_id): self.sample_data})

        self.assertValidResults(expected_route,
            self.client.get_team(team_id))

    def test_team_from_multiple_ids(self):
        """Test if a team is fetchable from multiple ids."""
        team_ids = [4242, 4243]
        expected_route = self.format_route('team', '/{ids}'.format(
            ids=','.join(str(t) for t in team_ids)))

        self.assertValidResults(expected_route,
            self.client.get_teams(team_ids))


class RiotWatcherOnlineTest(unittest.TestCase):
    """Test the compatibility of Riot Watcher against the current Riot API.

    IMPORTANT NOTICE: this test will run ONLY AND ONLY IF you have set a Riot
    API key in the environment variable 'RIOT_API_TOKEN' such as:
        RIOT_API_TOKEN='my-riot-api-token' python test.py

    This test will run every commands against the current Riot API, to know if
    routes are still compatible. If this test does not pass, you shall worry
    about the current version of your API.

    WARNING: If the API is down for any reasons, a 503 is returned, handled as
    an exception (LoLException). You may have occasional failure depending of
    the status of the Riot API.
    """

    @classmethod
    def setUpClass(cls):
        """Instantiate a client with the Riot API key in the environment."""
        cls.token = os.environ.get('RIOT_API_TOKEN')
        if cls.token is not None:
            cls.client = riotwatcher.RiotWatcher(cls.token)
        else:
            logging.warning("No Riot API token found in the environment. You "
                "may want to specify one, so this test will be run.")

    def wait(self):
        """Wait until the client can issue a request to the Riot API."""
        while not self.client.can_make_request():
            time.sleep(1)

    def test_end_to_end(self):
        """End to end test. Will check all functions in a logical order.

        Get a list of participants from the featured games. Since some tests
        have specific requirements (such as the user has to be team ranked),
        we may need to do more than one test. We can assume that if tests are
        not working for 5 summoners, the test is a failure.
        """
        # Abort if no token is found, but do not fail.
        if self.token is None:
            return

        self.wait()
        games = self.client.get_featured_games()["gameList"]
        summoner_names = [p["summonerName"] for game in games
            for p in game["participants"]][:5]

        # TODO: we might be able to optimise this a little, without re-running
        # all tests but only those failing.
        while summoner_names:
            summoner_name = summoner_names.pop()

            try:
                summoner = self._summoner_tests(summoner_name)

                self._game_tests(summoner)
                logging.info('game tests passed')

                self._league_tests(summoner)
                logging.info('league tests passed')

                self._stats_tests(summoner)
                logging.info('stats tests passed')

                self._team_tests(summoner)
                logging.info('team tests passed')

                match = self._match_list_tests(summoner)
                logging.info('match list tests passed')

                self._match_tests(match)
                logging.info('match passed')

            except riotwatcher.LoLException as e:
                # We do not specifically care which route was broken, except
                # if it is the last test.
                if not summoner_names:
                    raise
                else:
                    logging.warning("Error while reaching Riot API: %s", e)
            else:
                return

    def _match_tests(self, match):
        """Check the match API is fully supported."""
        self.wait()
        self.client.get_match(match['matchId'])

    def _stats_tests(self, summoner):
        """Check the stats API is fully supported."""
        self.wait()
        self.client.get_stat_summary(summoner['id'])
        self.wait()
        self.client.get_ranked_stats(summoner['id'])

    def _summoner_tests(self, summoner_name):
        """Check the summoner API is fully supported."""
        self.wait()
        summoner = self.client.get_summoner(name=summoner_name)

        self.wait()
        self.client.get_summoner(_id=summoner['id'])
        self.wait()
        self.client.get_mastery_pages([summoner['id']])
        self.wait()
        self.client.get_rune_pages([summoner['id']])
        self.wait()
        self.client.get_summoner_name([summoner['id']])

        return summoner

    def _team_tests(self, summoner):
        """Check the team API is fully supported."""
        self.wait()
        team = self.client.get_teams_for_summoner(summoner['id'])
        self.wait()
        self.client.get_team(team[0]['fullId'])

    def _match_list_tests(self, summoner):
        """Check the match list API is fully supported."""
        self.wait()
        return self.client.get_match_list(summoner['id'])['matches'][0]

    def _game_tests(self, summoner):
        """Check the game API is fully supported."""
        self.wait()
        self.client.get_recent_games(summoner['id'])

    def _league_tests(self, summoner):
        """Check the league API is fully supported."""
        self.wait()
        self.client.get_league(summoner_ids=[summoner['id']])
        self.wait()
        self.client.get_league_entry(summoner_ids=[summoner['id']])
        self.wait()
        self.client.get_challenger()
        self.wait()
        self.client.get_master()

    def test_champion(self):
        """Check the champion API is fully supported."""
        # Abort if no token is found, but do not fail.
        if self.token is None:
            return

        self.wait()
        all_champions = self.client.get_all_champions()

        self.wait()
        self.client.get_champion(all_champions['champions'][0]['id'])

    def test_current_game(self):
        """Check the game API is fully supported"""
        # Abort if no token is found, but do not fail.
        if self.token is None:
            return

        self.wait()
        featured = self.client.get_featured_games()
        name = featured['gameList'][0]['participants'][0]['summonerName']
        self.wait()
        player = self.client.get_summoner(name=name)
        self.wait()
        self.client.get_current_game(player['id'])

    def test_featured_games(self):
        """Check the featured API is fully supported."""
        # Abort if no token is found, but do not fail.
        if self.token is None:
            return

        self.wait()
        self.client.get_featured_games()

    def test_static(self):
        """Check the static API is fully supported."""
        # Abort if no token is found, but do not fail.
        if self.token is None:
            return

        self.wait()
        champions = self.client.static_get_champion_list()
        champion_id = champions['data'][list(champions['data'])[0]]['id']
        self.wait()
        self.client.static_get_champion(champion_id)

        self.wait()
        items = self.client.static_get_item_list()
        item_id = items['data'][list(items['data'])[0]]['id']
        self.wait()
        self.client.static_get_item(item_id)

        self.wait()
        masteries = self.client.static_get_mastery_list()
        mastery_id = masteries['data'][list(masteries['data'])[0]]['id']
        self.wait()
        self.client.static_get_mastery(mastery_id)
        self.wait()
        self.client.static_get_realm()

        self.wait()
        runes = self.client.static_get_rune_list()
        rune_id = runes['data'][list(runes['data'])[0]]['id']
        self.wait()
        self.client.static_get_rune(rune_id)

        self.wait()
        spells = self.client.static_get_summoner_spell_list()
        summoner_spell_id = spells['data'][list(spells['data'])[0]]['id']
        self.wait()
        self.client.static_get_summoner_spell(summoner_spell_id)
        self.wait()
        self.client.static_get_versions()

    def test_status(self):
        """Check the status API is fully supported."""
        # Abort if no token is found, but do not fail.
        if self.token is None:
            return

        self.wait()
        self.client.get_server_status()
        self.wait()
        self.client.get_server_status(region=riotwatcher.NORTH_AMERICA)


if __name__ == "__main__":
    unittest.main()
