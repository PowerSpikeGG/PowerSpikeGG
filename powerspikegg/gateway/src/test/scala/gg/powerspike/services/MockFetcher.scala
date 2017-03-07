package gg.powerspike.services

import fetcher.rds.MatchFetcherGrpc.MatchFetcherImplBase
import fetcher.rds.Service.MatchRequest
import game.leagueoflegends.Constants.Summoner
import game.leagueoflegends.Match.MatchReference
import io.grpc.stub.StreamObserver


/**
  * This is an implementation of the fetcher service for grpc (//powerspikegg/rawdata/fetcher) for testing purpose
  */
class MockFetcher extends MatchFetcherImplBase {

  override def `match`(matchRequest: MatchRequest, streamObserver: StreamObserver[MatchReference]): Unit = {
    streamObserver.onNext(MatchReference.newBuilder().build())
    streamObserver.onCompleted()
  }

  override def updateSummoner(summoner: Summoner, streamObserver: StreamObserver[MatchReference]): Unit = {
    streamObserver.onNext(MatchReference.newBuilder().build())
    streamObserver.onCompleted()
  }

}