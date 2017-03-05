package gg.powerspike

import akka.http.scaladsl.testkit.ScalatestRouteTest
import org.scalatest.{Matchers, WordSpec}

class MatchRouteTest extends WordSpec with Matchers with ScalatestRouteTest {

  val matchId = 2997314842L

  "The Match api" should {
    "return the most recent matches of a summoner" in {
      Get("/api/summoner/Rangork") ~> WebServer.route ~> check {
        responseAs[String] should (not be empty and startWith ("{") and endWith ("}"))
      }
    }
  }

}
