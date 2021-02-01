import sys
from radiopi import Log
from . import server


log = Log('web.log').logging


def launch_server():
    log.info("Starting RadioPi Web App ")
    server.run()


if __name__ == "__main__":
    if sys.version_info[0] < 3:
        log.error(
            "Unsupported Python version (Python %s). Minimum required version is Python 3.",
            sys.version_info[0])
        sys.exit(1)
    launch_server()
