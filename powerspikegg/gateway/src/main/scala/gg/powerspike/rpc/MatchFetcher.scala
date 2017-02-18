package gg.powerspike.rpc

import fetcher.rds.MatchFetcherGrpc
import fetcher.rds.Service.MatchRequest
import game.leagueoflegends.Constants.{Region, Summoner}
import game.leagueoflegends.Match.MatchReference
import collection.JavaConverters._

/**
  * Created by cassan on 17/02/17.
  * 3065640922
  */
class MatchFetcher(context: GrpcContext) {

  private val matchFetcher = MatchFetcherGrpc.newBlockingStub(context.channel)

  /**
    * Retrieve a match from its id and region
    * @param matchId Identifier of the match
    * @param region The region in which the match is played
    * @return Details of the match as described in //powerspikegg/rawdata/public/match.proto
    */
  def getById(matchId: Long, region: Region = Region.EUW): MatchReference = {
    val matchRequest = MatchRequest.newBuilder()
      .setId(matchId)
      .setRegion(region)
      .build()

    // TODO: Catch StatusRuntimeException
    val response = matchFetcher.`match`(matchRequest)

    response
  }

  /**
    * Retrieve the most recents match of a summoner from its name
    * @param name The name of the summoner
    * @param region The region in which the summoner is registered
    * @return a list of details of matchs as described in //powerspikegg/rawdata/public/match.proto
    */
  def getBySummoner(name: String, region: Region = Region.EUW): Iterator[MatchReference] = {
    val summoner = Summoner.newBuilder()
      .setName(name)
      .setRegion(region)
      .build()

    val response = matchFetcher
      .updateSummoner(summoner)
      .asScala

    response
  }

}
