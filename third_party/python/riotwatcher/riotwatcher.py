from collections import deque
import time
import requests
import sys


# Constants
BRAZIL = u'br'
EUROPE_NORDIC_EAST = u'eune'
EUROPE_WEST = u'euw'
KOREA = u'kr'
LATIN_AMERICA_NORTH = u'lan'
LATIN_AMERICA_SOUTH = u'las'
NORTH_AMERICA = u'na'
OCEANIA = u'oce'
RUSSIA = u'ru'
TURKEY = u'tr'
JAPAN = u'jp'

# Platforms
platforms = {
    BRAZIL: u'BR1',
    EUROPE_NORDIC_EAST: u'EUN1',
    EUROPE_WEST: u'EUW1',
    KOREA: u'KR',
    LATIN_AMERICA_NORTH: u'LA1',
    LATIN_AMERICA_SOUTH: u'LA2',
    NORTH_AMERICA: u'NA1',
    OCEANIA: u'OC1',
    RUSSIA: u'RU',
    TURKEY: u'TR1',
    JAPAN: u'JP1'
}

queue_types = [
    u'CUSTOM',  # Custom games
    u'NORMAL_5x5_BLIND',  # Normal 5v5 blind pick
    u'BOT_5x5',  # Historical Summoners Rift coop vs AI games
    u'BOT_5x5_INTRO',  # Summoners Rift Intro bots
    u'BOT_5x5_BEGINNER',  # Summoner's Rift Coop vs AI Beginner Bot games
    u'BOT_5x5_INTERMEDIATE',  # Historical Summoner's Rift Coop vs AI Intermediate Bot games
    u'NORMAL_3x3',  # Normal 3v3 games
    u'NORMAL_5x5_DRAFT',  # Normal 5v5 Draft Pick games
    u'ODIN_5x5_BLIND',  # Dominion 5v5 Blind Pick games
    u'ODIN_5x5_DRAFT',  # Dominion 5v5 Draft Pick games
    u'BOT_ODIN_5x5',  # Dominion Coop vs AI games
    u'RANKED_SOLO_5x5',  # Ranked Solo 5v5 games
    u'RANKED_PREMADE_3x3',  # Ranked Premade 3v3 games
    u'RANKED_PREMADE_5x5',  # Ranked Premade 5v5 games
    u'RANKED_TEAM_3x3',  # Ranked Team 3v3 games
    u'RANKED_TEAM_5x5',  # Ranked Team 5v5 games
    u'BOT_TT_3x3',  # Twisted Treeline Coop vs AI games
    u'GROUP_FINDER_5x5',  # Team Builder games
    u'ARAM_5x5',  # ARAM games
    u'ONEFORALL_5x5',  # One for All games
    u'FIRSTBLOOD_1x1',  # Snowdown Showdown 1v1 games
    u'FIRSTBLOOD_2x2',  # Snowdown Showdown 2v2 games
    u'SR_6x6',  # Hexakill games
    u'URF_5x5',  # Ultra Rapid Fire games
    u'BOT_URF_5x5',  # Ultra Rapid Fire games played against AI games
    u'NIGHTMARE_BOT_5x5_RANK1',  # Doom Bots Rank 1 games
    u'NIGHTMARE_BOT_5x5_RANK2',  # Doom Bots Rank 2 games
    u'NIGHTMARE_BOT_5x5_RANK5',  # Doom Bots Rank 5 games
    u'ASCENSION_5x5',  # Ascension games
    u'HEXAKILL',  # 6v6 games on twisted treeline
    u'KING_PORO_5x5',  # King Poro game games
    u'COUNTER_PICK',  # Nemesis games,
    u'BILGEWATER_5x5',  # Black Market Brawlers games
]

game_maps = [
    {u'map_id': 1, 'name': "Summoner's Rift", 'notes': "Summer Variant"},
    {u'map_id': 2, 'name': "Summoner's Rift", 'notes': "Autumn Variant"},
    {u'map_id': 3, 'name': "The Proving Grounds", 'notes': "Tutorial Map"},
    {u'map_id': 4, 'name': "Twisted Treeline", 'notes': "Original Version"},
    {u'map_id': 8, 'name': "The Crystal Scar", 'notes': "Dominion Map"},
    {u'map_id': 10, 'name': "Twisted Treeline", 'notes': "Current Version"},
    {u'map_id': 11, 'name': "Summoner's Rift", 'notes': "Current Version"},
    {u'map_id': 12, 'name': "Howling Abyss", 'notes': "ARAM Map"},
    {u'map_id': 14, 'name': "Butcher's Bridge", 'notes': "ARAM Map"},
]

game_modes = [
    u'CLASSIC',  # Classic Summoner's Rift and Twisted Treeline games
    u'ODIN',  # Dominion/Crystal Scar games
    u'ARAM',  # ARAM games
    u'TUTORIAL',  # Tutorial games
    u'ONEFORALL',  # One for All games
    u'ASCENSION',  # Ascension games
    u'FIRSTBLOOD',  # Snowdown Showdown games
    u'KINGPORO',  # King Poro games
]

game_types = [
    u'CUSTOM_GAME',  # Custom games
    u'TUTORIAL_GAME',  # Tutorial games
    u'MATCHED_GAME',  # All other games
]

sub_types = [
    u'NONE',  # Custom games
    u'NORMAL',  # Summoner's Rift unranked games
    u'NORMAL_3x3',  # Twisted Treeline unranked games
    u'ODIN_UNRANKED',  # Dominion/Crystal Scar games
    u'ARAM_UNRANKED_5v5',  # ARAM / Howling Abyss games
    u'BOT',  # Summoner's Rift and Crystal Scar games played against AI
    u'BOT_3x3',  # Twisted Treeline games played against AI
    u'RANKED_SOLO_5x5',  # Summoner's Rift ranked solo queue games
    u'RANKED_TEAM_3x3',  # Twisted Treeline ranked team games
    u'RANKED_TEAM_5x5',  # Summoner's Rift ranked team games
    u'ONEFORALL_5x5',  # One for All games
    u'FIRSTBLOOD_1x1',  # Snowdown Showdown 1x1 games
    u'FIRSTBLOOD_2x2',  # Snowdown Showdown 2x2 games
    u'SR_6x6',  # Hexakill games
    u'CAP_5x5',  # Team Builder games
    u'URF',  # Ultra Rapid Fire games
    u'URF_BOT',  # Ultra Rapid Fire games against AI
    u'NIGHTMARE_BOT',  # Nightmare bots
    u'ASCENSION',  # Ascension games
    u'HEXAKILL',  # Twisted Treeline 6x6 Hexakill
    u'KING_PORO',  # King Poro games
    u'COUNTER_PICK',  # Nemesis games
    u'BILGEWATER',  # Black Market Brawlers games
]

player_stat_summary_types = [
    u'Unranked',  # Summoner's Rift unranked games
    u'Unranked3x3',  # Twisted Treeline unranked games
    u'OdinUnranked',  # Dominion/Crystal Scar games
    u'AramUnranked5x5',  # ARAM / Howling Abyss games
    u'CoopVsAI',  # Summoner's Rift and Crystal Scar games played against AI
    u'CoopVsAI3x3',  # Twisted Treeline games played against AI
    u'RankedSolo5x5',  # Summoner's Rift ranked solo queue games
    u'RankedTeams3x3',  # Twisted Treeline ranked team games
    u'RankedTeams5x5',  # Summoner's Rift ranked team games
    u'OneForAll5x5',  # One for All games
    u'FirstBlood1x1',  # Snowdown Showdown 1x1 games
    u'FirstBlood2x2',  # Snowdown Showdown 2x2 games
    u'SummonersRift6x6',  # Hexakill games
    u'CAP5x5',  # Team Builder games
    u'URF',  # Ultra Rapid Fire games
    u'URFBots',  # Ultra Rapid Fire games played against AI
    u'NightmareBot',  # Summoner's Rift games played against Nightmare AI
    u'Hexakill',  # Twisted Treeline 6x6 Hexakill games
    u'KingPoro',  # King Poro games
    u'CounterPick',  # Nemesis games
    u'Bilgewater',  # Black Market Brawlers games
]

solo_queue, ranked_5s, ranked_3s = u'RANKED_SOLO_5x5', u'RANKED_TEAM_5x5', u'RANKED_TEAM_3x3'

preseason_3, season_3, preseason_2014, season_2014, preseason_2015, season_2015, preseason_2016, season_2016 = [
    u'PRESEASON3', u'SEASON3',
    u'PRESEASON2014', u'SEASON2014',
    u'PRESEASON2015', u'SEASON2015',
    u'PRESEASON2016', u'SEASON2016',
]

api_versions = {
    u'champion': 1.2,
    u'current-game': 1.0,
    u'featured-games': 1.0,
    u'game': 1.3,
    u'league': 2.5,
    u'lol-static-data': 1.2,
    u'lol-status': 1.0,
    u'match': 2.2,
    u'matchlist': 2.2,
    u'stats': 1.3,
    u'summoner': 1.4,
    u'team': 2.4
}


class LoLException(Exception):
    def __init__(self, error, response):
        self.error = error
        self.headers = response.headers

    def __str__(self):
        return self.error

    def __eq__(self, other):
        if isinstance(other, u''.__class__):
            return self.error == other
        elif isinstance(other, self.__class__):
            return self.error == other.error and self.headers == other.headers
        else:
            return False

    def __ne__(self, other):
        return not self.__eq__(other)

    def __hash__(self):
        return super(LoLException).__hash__()


error_400 = u'Bad request'
error_401 = u'Unauthorized'
error_403 = u'Blacklisted key'
error_404 = u'Game data not found'
error_429 = u'Too many requests'
error_500 = u'Internal server error'
error_503 = u'Service unavailable'
error_504 = u'Gateway timeout'


def raise_status(response):
    if response.status_code == 400:
        raise LoLException(error_400, response)
    elif response.status_code == 401:
        raise LoLException(error_401, response)
    elif response.status_code == 403:
        raise LoLException(error_403, response)
    elif response.status_code == 404:
        raise LoLException(error_404, response)
    elif response.status_code == 429:
        raise LoLException(error_429, response)
    elif response.status_code == 500:
        raise LoLException(error_500, response)
    elif response.status_code == 503:
        raise LoLException(error_503, response)
    elif response.status_code == 504:
        raise LoLException(error_504, response)
    else:
        response.raise_for_status()


class RateLimit(object):
    def __init__(self, allowed_requests, seconds):
        self.allowed_requests = allowed_requests
        self.seconds = seconds
        self.made_requests = deque()

    def __reload(self):
        t = time.time()
        while len(self.made_requests) > 0 and self.made_requests[0] < t:
            self.made_requests.popleft()

    def add_request(self):
        self.made_requests.append(time.time() + self.seconds)

    def request_available(self):
        self.__reload()
        return len(self.made_requests) < self.allowed_requests


class RiotWatcher(object):

    # Used for testing purpose (do NOT modify this for production code)
    enable_https = True

    def __init__(self, key, default_region=NORTH_AMERICA, limits=(RateLimit(10, 10), RateLimit(500, 600), )):
        self.key = key  #If you have a production key, use limits=(RateLimit(3000,10), RateLimit(180000,600),)
        self.default_region = default_region
        self.limits = limits

    def can_make_request(self):
        for lim in self.limits:
            if not lim.request_available():
                return False
        return True

    def format_base_url(self, region, static):
        """Format the base URL to reach the Riot API.

        This method may be override for testing purpose, or if you want to
        change the target URL of the library.

        Parameters:
            region: region proxy, set to global if getting static data.
            static: boolean indicating if the route is for getting static data.
        """
        return u'{proxy}.api.pvp.net/api/lol'.format(
            proxy=u'global' if static else region.lower(),
        )

    def base_request(self, url, region, static=False, **kwargs):
        if region is None:
            region = self.default_region
        args = {u'api_key': self.key}
        for k in kwargs:
            if kwargs[k] is not None:
                args[k] = kwargs[k]
        r = requests.get(u'{protocol}://{base_url}/{static}{region}/{url}'.format(
                protocol=u'https' if self.enable_https else 'http',
                base_url=self.format_base_url(region, static),
                static=u'static-data/' if static else '',
                region=region.lower(),
                url=url
            ), params=args)
        if not static:
            for lim in self.limits:
                lim.add_request()
        raise_status(r)
        return r.json()

    def _observer_mode_request(self, url, proxy=None, **kwargs):
        if proxy is None:
            proxy = self.default_region
        args = {u'api_key': self.key}
        for k in kwargs:
            if kwargs[k] is not None:
                args[k] = kwargs[k]
        r = requests.get(
            u'https://{proxy}.api.pvp.net/observer-mode/rest/{url}'.format(
                proxy=proxy,
                url=url
            ),
            params=args
        )
        for lim in self.limits:
            lim.add_request()
        raise_status(r)
        return r.json()

    @staticmethod
    def sanitized_name(name):
        if sys.version_info > (3, 0):
            return name.replace(u' ', u'').lower()
        return name.decode("utf-8").replace(u' ', u'').lower()

    # champion-v1.2
    def _champion_request(self, end_url, region, **kwargs):
        return self.base_request(
            u'v{version}/champion/{end_url}'.format(
                version=api_versions[u'champion'],
                end_url=end_url
            ),
            region,
            **kwargs
        )

    def get_all_champions(self, region=None, free_to_play=False):
        return self._champion_request(u'', region, freeToPlay=free_to_play)

    def get_champion(self, champion_id, region=None):
        return self._champion_request(u'{id}'.format(id=champion_id), region)

    # current-game-v1.0
    def get_current_game(self, summoner_id, platform_id=None, region=None):
        if platform_id is None:
            platform_id = platforms[self.default_region]
        return self._observer_mode_request(
            u'consumer/getSpectatorGameInfo/{platform}/{summoner_id}'.format(
                platform=platform_id,
                summoner_id=summoner_id
            ),
            region
        )

    # featured-game-v1.0
    def get_featured_games(self, proxy=None):
        return self._observer_mode_request(u'featured', proxy)

    # game-v1.3
    def _game_request(self, end_url, region, **kwargs):
        return self.base_request(
            u'v{version}/game/{end_url}'.format(
                version=api_versions[u'game'],
                end_url=end_url
            ),
            region,
            **kwargs
        )

    def get_recent_games(self, summoner_id, region=None):
        return self._game_request(u'by-summoner/{summoner_id}/recent'.format(summoner_id=summoner_id), region)

    # league-v2.5
    def _league_request(self, end_url, region, **kwargs):
        return self.base_request(
            u'v{version}/league/{end_url}'.format(
                version=api_versions[u'league'],
                end_url=end_url
            ),
            region,
            **kwargs
        )

    def get_league(self, summoner_ids=None, team_ids=None, region=None):
        """summoner_ids and team_ids arguments must be iterable, only one should be specified, not both"""
        if (summoner_ids is None) != (team_ids is None):
            if summoner_ids is not None:
                return self._league_request(
                    u'by-summoner/{summoner_ids}'.format(summoner_ids=u','.join([str(s) for s in summoner_ids])),
                    region
                )
            else:
                return self._league_request(
                    u'by-team/{team_ids}'.format(team_ids=u','.join([str(t) for t in team_ids])),
                    region
                )

    def get_league_entry(self, summoner_ids=None, team_ids=None, region=None):
        """summoner_ids and team_ids arguments must be iterable, only one should be specified, not both"""
        if (summoner_ids is None) != (team_ids is None):
            if summoner_ids is not None:
                return self._league_request(
                    u'by-summoner/{summoner_ids}/entry'.format(
                        summoner_ids=u','.join([str(s) for s in summoner_ids])
                    ),
                    region
                )
            else:
                return self._league_request(
                    u'by-team/{team_ids}/entry'.format(team_ids=u','.join([str(t) for t in team_ids])),
                    region
                )

    def get_challenger(self, region=None, queue=solo_queue):
        return self._league_request(u'challenger', region, type=queue)

    def get_master(self, region=None, queue=solo_queue):
        return self._league_request(u'master', region, type=queue)

    # lol-static-data-v1.2
    def _static_request(self, end_url, region, **kwargs):
        return self.base_request(
            u'v{version}/{end_url}'.format(
                version=api_versions[u'lol-static-data'],
                end_url=end_url
            ),
            region,
            static=True,
            **kwargs
        )

    def static_get_champion_list(self, region=None, locale=None, version=None, data_by_id=None, champ_data=None):
        return self._static_request(
            u'champion',
            region,
            locale=locale,
            version=version,
            dataById=data_by_id,
            champData=champ_data
        )

    def static_get_champion(self, champ_id, region=None, locale=None, version=None, champ_data=None):
        return self._static_request(
            u'champion/{id}'.format(id=champ_id),
            region,
            locale=locale,
            version=version,
            champData=champ_data
        )

    def static_get_item_list(self, region=None, locale=None, version=None, item_list_data=None):
        return self._static_request(u'item', region, locale=locale, version=version, itemListData=item_list_data)

    def static_get_item(self, item_id, region=None, locale=None, version=None, item_data=None):
        return self._static_request(
            u'item/{id}'.format(id=item_id),
            region,
            locale=locale,
            version=version,
            itemData=item_data
        )

    def static_get_mastery_list(self, region=None, locale=None, version=None, mastery_list_data=None):
        return self._static_request(
            u'mastery',
            region,
            locale=locale,
            version=version,
            masteryListData=mastery_list_data
        )

    def static_get_mastery(self, mastery_id, region=None, locale=None, version=None, mastery_data=None):
        return self._static_request(
            u'mastery/{id}'.format(id=mastery_id),
            region,
            locale=locale,
            version=version,
            masteryData=mastery_data
        )

    def static_get_realm(self, region=None):
        return self._static_request(u'realm', region)

    def static_get_rune_list(self, region=None, locale=None, version=None, rune_list_data=None):
        return self._static_request(u'rune', region, locale=locale, version=version, runeListData=rune_list_data)

    def static_get_rune(self, rune_id, region=None, locale=None, version=None, rune_data=None):
        return self._static_request(
            u'rune/{id}'.format(id=rune_id),
            region,
            locale=locale,
            version=version,
            runeData=rune_data
        )

    def static_get_summoner_spell_list(self, region=None, locale=None, version=None, data_by_id=None, spell_data=None):
        return self._static_request(
            u'summoner-spell',
            region,
            locale=locale,
            version=version,
            dataById=data_by_id,
            spellData=spell_data
        )

    def static_get_summoner_spell(self, spell_id, region=None, locale=None, version=None, spell_data=None):
        return self._static_request(
            u'summoner-spell/{id}'.format(id=spell_id),
            region,
            locale=locale,
            version=version,
            spellData=spell_data
        )

    def static_get_versions(self, region=None):
        return self._static_request(u'versions', region)

    # match-v2.2
    def _match_request(self, end_url, region, **kwargs):
        return self.base_request(
            u'v{version}/match/{end_url}'.format(
                version=api_versions[u'match'],
                end_url=end_url
            ),
            region,
            **kwargs
        )

    def get_match(self, match_id, region=None, include_timeline=False):
        return self._match_request(
            u'{match_id}'.format(match_id=match_id),
            region,
            includeTimeline=include_timeline
        )

    # lol-status-v1.0
    @staticmethod
    def get_server_status(region=None):
        if region is None:
            url = u'shards'
        else:
            url = u'shards/{region}'.format(region=region)
        r = requests.get(u'http://status.leagueoflegends.com/{url}'.format(url=url))
        raise_status(r)
        return r.json()

    # match list-v2.2
    def _match_list_request(self, end_url, region, **kwargs):
        return self.base_request(
            u'v{version}/matchlist/by-summoner/{end_url}'.format(
                version=api_versions[u'matchlist'],
                end_url=end_url,
            ),
            region,
            **kwargs
        )

    def get_match_list(self, summoner_id, region=None, champion_ids=None, ranked_queues=None, season=None,
                       begin_time=None, end_time=None, begin_index=None, end_index=None):
        if ranked_queues is not None and not isinstance(ranked_queues, str) :
            ranked_queues = u','.join(ranked_queues)
        if season is not None and not isinstance(season, str):
            season = u','.join(season)
        return self._match_list_request(
            u'{summoner_id}'.format(summoner_id=summoner_id),
            region,
            championIds=champion_ids,
            rankedQueues=ranked_queues,
            seasons=season,
            beginTime=begin_time,
            endTime=end_time,
            beginIndex=begin_index,
            endIndex=end_index
        )

    # stats-v1.3
    def _stats_request(self, end_url, region, **kwargs):
        return self.base_request(
            u'v{version}/stats/{end_url}'.format(
                version=api_versions[u'stats'],
                end_url=end_url
            ),
            region,
            **kwargs
        )

    def get_stat_summary(self, summoner_id, region=None, season=None):
        return self._stats_request(
            u'by-summoner/{summoner_id}/summary'.format(summoner_id=summoner_id),
            region,
            season=u'SEASON{}'.format(season) if season is not None else None)

    def get_ranked_stats(self, summoner_id, region=None, season=None):
        return self._stats_request(
            u'by-summoner/{summoner_id}/ranked'.format(summoner_id=summoner_id),
            region,
            season=u'SEASON{}'.format(season) if season is not None else None
        )

    # summoner-v1.4
    def _summoner_request(self, end_url, region, **kwargs):
        return self.base_request(
            u'v{version}/summoner/{end_url}'.format(
                version=api_versions[u'summoner'],
                end_url=end_url
            ),
            region,
            **kwargs
        )

    def get_mastery_pages(self, summoner_ids, region=None):
        return self._summoner_request(
            u'{summoner_ids}/masteries'.format(summoner_ids=u','.join([str(s) for s in summoner_ids])),
            region
        )

    def get_rune_pages(self, summoner_ids, region=None):
        return self._summoner_request(
            u'{summoner_ids}/runes'.format(summoner_ids=u','.join([str(s) for s in summoner_ids])),
            region
        )

    def get_summoners(self, names=None, ids=None, region=None):
        if (names is None) != (ids is None):
            return self._summoner_request(
                u'by-name/{summoner_names}'.format(
                    summoner_names=u','.join([self.sanitized_name(n) for n in names])) if names is not None
                else u'{summoner_ids}'.format(summoner_ids=u','.join([str(i) for i in ids])),
                region
            )
        else:
            return None

    def get_summoner(self, name=None, _id=None, region=None):
        if (name is None) != (_id is None):
            if name is not None:
                name = self.sanitized_name(name)
                key, summoner = self.get_summoners(names=[name, ], region=region).popitem()
                return summoner
            else:
                return self.get_summoners(ids=[_id, ], region=region)[str(_id)]
        return None

    def get_summoner_name(self, summoner_ids, region=None):
        return self._summoner_request(
            u'{summoner_ids}/name'.format(summoner_ids=u','.join([str(s) for s in summoner_ids])),
            region
        )

    # team-v2.4
    def _team_request(self, end_url, region, **kwargs):
        return self.base_request(
            u'v{version}/team/{end_url}'.format(
                version=api_versions[u'team'],
                end_url=end_url
            ),
            region,
            **kwargs
        )

    def get_teams_for_summoner(self, summoner_id, region=None):
        return self.get_teams_for_summoners([summoner_id, ], region=region)[str(summoner_id)]

    def get_teams_for_summoners(self, summoner_ids, region=None):
        return self._team_request(
            u'by-summoner/{summoner_id}'.format(summoner_id=u','.join([str(s) for s in summoner_ids])),
            region
        )

    def get_team(self, team_id, region=None):
        return self.get_teams([team_id, ], region=region)[str(team_id)]

    def get_teams(self, team_ids, region=None):
        return self._team_request(u'{team_ids}'.format(team_ids=u','.join(str(t) for t in team_ids)), region)
