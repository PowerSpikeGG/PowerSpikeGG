package gg.powerspike

import akka.http.scaladsl.testkit.ScalatestRouteTest
import org.scalatest.{Matchers, WordSpec}

class SummonerRouteTest extends WordSpec with Matchers with ScalatestRouteTest {

  private val server = MockGrpcServer.server

  "The Summoner api" should {
    "return the most recent matches of a summoner as a json array" in {
      Get("/api/summoner/Rangork") ~> WebServer.route ~> check {
        responseAs[String] should (not be empty and startWith ("[") and endWith ("]"))
      }
    }
  }

}