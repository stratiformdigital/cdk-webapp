import { API } from "aws-amplify";

function requestOptions() {
  return {};
}

export function listAmendments() {
  const opts = requestOptions();
  return API.get("amendments", "/amendments", opts);
}

export function getAmendment(id) {
  const opts = requestOptions();
  return API.get("amendments", `/amendments/${id}`, opts);
}

export function createAmendment(body) {
  const opts = requestOptions();
  opts.body = body;
  return API.post("amendments", "/amendments", opts);
}

export function updateAmendment(id, body) {
  const opts = requestOptions();
  opts.body = body;
  return API.put("amendments", `/amendments/${id}`, opts);
}

export function deleteAmendment(id) {
  const opts = requestOptions();
  return API.del("amendments", `/amendments/${id}`, opts);
}
