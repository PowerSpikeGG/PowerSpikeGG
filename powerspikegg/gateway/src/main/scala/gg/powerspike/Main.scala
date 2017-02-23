package gg.powerspike

import akka.http.scaladsl.settings.ServerSettings
import com.typesafe.config.ConfigFactory

object Main {

  def main(args: Array[String]): Unit = {
    WebServer.startServer("localhost", 8080, ServerSettings(ConfigFactory.load))
  }

}
