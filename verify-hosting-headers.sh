#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-${PRODUCTION_BASE_URL:-https://abosh-portfolio.web.app}}"
REQUIRED_HEADERS=(
  "content-security-policy"
  "strict-transport-security"
  "x-content-type-options"
  "referrer-policy"
  "permissions-policy"
  "x-frame-options"
)

check_headers() {
  local path="$1"
  local tmp
  tmp="$(mktemp)"

  echo "Checking ${BASE_URL}${path}"
  curl -sSI "${BASE_URL}${path}" >"${tmp}"

  for header in "${REQUIRED_HEADERS[@]}"; do
    if ! grep -qi "^${header}:" "${tmp}"; then
      echo "Missing required header '${header}' for ${BASE_URL}${path}" >&2
      cat "${tmp}" >&2
      rm -f "${tmp}"
      exit 1
    fi
  done

  rm -f "${tmp}"
}

check_cache_header() {
  local path="$1"
  local expected_substring="$2"
  local tmp
  tmp="$(mktemp)"

  echo "Checking cache policy for ${BASE_URL}${path}"
  curl -sSI "${BASE_URL}${path}" >"${tmp}"

  if ! grep -qi "^cache-control: .*${expected_substring}" "${tmp}"; then
    echo "Cache-Control for ${BASE_URL}${path} did not include '${expected_substring}'" >&2
    cat "${tmp}" >&2
    rm -f "${tmp}"
    exit 1
  fi

  rm -f "${tmp}"
}

check_headers "/"
check_headers "/contact"
check_headers "/icon.svg"

check_cache_header "/" "no-cache"
check_cache_header "/icon.svg" "max-age=31536000"

echo "All required production hosting headers are present."
