FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

COPY graph-service.sh /usr/local/bin/ctv-graph-service
RUN chmod +x /usr/local/bin/ctv-graph-service

USER node
ENTRYPOINT ["/usr/local/bin/ctv-graph-service"]
