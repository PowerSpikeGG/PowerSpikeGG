package gg.powerspike

import akka.http.scaladsl.testkit.ScalatestRouteTest
import org.scalatest.{Matchers, WordSpec}

class SummonerRouteTest extends WordSpec with Matchers with ScalatestRouteTest {
  "The Summoner api" should {
    "return the most recent matches of a summoner" in {
      Get("/api/summoner/Rangork") ~> WebServer.route ~> check {
        responseAs[String] should (not be empty and startWith ("[") and endWith ("]"))
      }
    }
  }
}
