import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Amendments.css";
import Select from "react-select";
import Switch from "react-ios-switch";
import { territoryList } from "../libs/territoryLib";
import * as url from "url";
import { getAmendment, updateAmendment, deleteAmendment } from "../libs/api";
import {
  capitalize,
  validateAmendmentForm,
  validateFileAttachment,
} from "../libs/helpers";

export default function Amendments({ fileUpload, fileURLResolver }) {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [amendment, setAmendment] = useState(null);
  const [transmittalNumber, setTransmittalNumber] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [territory, setTerritory] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [comments, setComments] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadAmendment() {
      return getAmendment(id);
    }

    async function onLoad() {
      try {
        const amendment = await loadAmendment();
        const {
          email,
          firstName,
          lastName,
          territory,
          transmittalNumber,
          urgent,
          comments,
          attachment,
        } = amendment;
        if (attachment) {
          console.log(fileURLResolver);
          // We must await the url.  Otherwise, the attachmentURL is a Promise.
          amendment.attachmentURL = await fileURLResolver(attachment);
        }
        setEmail(email);
        setFirstName(capitalize(firstName));
        setLastName(capitalize(lastName));
        setTerritory(territory);
        setTransmittalNumber(transmittalNumber);
        setUrgent(urgent);
        setComments(comments);
        setAmendment(amendment);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id, fileURLResolver]);

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  function saveAmendment(amendment) {
    return updateAmendment(id, amendment);
  }

  async function handleSubmit(event) {
    let attachment;

    event.preventDefault();

    if (!validateFileAttachment(file)) return;

    setIsLoading(true);

    try {
      if (file.current) {
        attachment = await fileUpload(file.current);
      }
      await saveAmendment({
        email,
        firstName,
        lastName,
        territory,
        transmittalNumber,
        urgent,
        comments,
        attachment: attachment || amendment.attachment,
      });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this amendment?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteAmendment(id);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }

  function openAttachment(event, attachmentURL) {
    event.preventDefault();
    const uri = url.parse(attachmentURL);
    var options = {
      hostname: uri.hostname,
      port: uri.port,
      path: `${uri.pathname}${uri.search}`,
      protocol: uri.protocol,
      method: "GET",
    };
    fetch(uri, options)
      .then((res) => {
        window.open(attachmentURL, "_blank");
      })
      .catch((err) => {
        if (err.json().statusCode.toString() === "403") {
          window.open(
            process.env.PUBLIC_URL + "/scan-in-progress.html",
            "_blank"
          );
        }
      });
  }

  return (
    <div className="Amendments">
      {amendment && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="transmittalNumber">
            <FormLabel>APS ID &nbsp;(Transmittal Number)</FormLabel>
            <FormControl
              disabled={true}
              value={transmittalNumber}
              onChange={(e) => setTransmittalNumber(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="name">
            <FormLabel>Submitter</FormLabel>
            <FormControl value={firstName + " " + lastName} disabled={true} />
          </FormGroup>
          <FormGroup controlId="email">
            <FormLabel>Submitter Email</FormLabel>
            <FormControl
              value={email}
              disabled={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="territory">
            <FormLabel>State/Territory</FormLabel>
            <Select
              name="form-field-name"
              value={territoryList.filter(function (option) {
                return option.value === territory;
              })}
              isDisabled={true}
              onChange={(e) => setTerritory(e.value)}
              options={territoryList}
            />
          </FormGroup>
          <FormGroup controlId="urgent">
            <FormLabel>This APS is classified as urgent &nbsp;</FormLabel>
            <Switch
              controlId="urgent"
              checked={urgent}
              onChange={(e) => setUrgent(!urgent)}
            />
          </FormGroup>
          {amendment.attachment && (
            <FormGroup>
              <FormLabel>Attachment</FormLabel>
              <button
                className="link-lookalike"
                onClick={(e) => openAttachment(e, amendment.attachmentURL)}
              >
                {formatFilename(amendment.attachment)}
              </button>
            </FormGroup>
          )}
          <FormGroup controlId="file">
            {!amendment.attachment && <FormLabel>Attachment</FormLabel>}
            <FormControl
              className="Amendments button link-lookalike"
              onChange={handleFileChange}
              type="file"
            />
          </FormGroup>
          <FormGroup controlId="comments">
            <FormLabel>Additional Comments</FormLabel>
            <FormControl
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              as="textarea"
            />
          </FormGroup>
          <LoaderButton
            type="submit"
            isLoading={isLoading}
            disabled={
              !validateAmendmentForm(email, firstName, lastName, territory)
            }
          >
            Save
          </LoaderButton>
          <LoaderButton onClick={handleDelete} isLoading={isDeleting}>
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}
