package gg.powerspike

import akka.http.scaladsl.testkit.ScalatestRouteTest
import gg.powerspike.services.MockGrpcServer
import org.scalatest.{Matchers, WordSpec}

class MatchRouteTest extends WordSpec with Matchers with ScalatestRouteTest with MockGrpcServer {

  "The Match api" should {
    "return the details of a match referenced by an id in json" in {
      Get("/api/matchs/2997314842") ~> WebServer.route ~> check {
        responseAs[String] should (not be empty and startWith ("{") and endWith ("}"))
      }
    }
  }

}