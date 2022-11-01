import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { PageHeader } from "../components/PageHeader";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { listAmendments } from "../libs/api";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  const [amendments, setAmendments] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const amendments = await loadAmendments();
        setAmendments(amendments);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadAmendments() {
    return listAmendments();
  }

  function renderAmendmentsList(amendments) {
    return [{}].concat(amendments).map((amendment, i) =>
      i !== 0 ? (
        <LinkContainer
          key={amendment.amendmentId}
          to={`/amendments/${amendment.amendmentId}`}
        >
          <ListGroupItem as="button">
            <div>
              <div style={{ fontWeight: "bold" }}>
                {amendment.transmittalNumber.trim().split("\n")[0]}
              </div>
              {"Created: " + new Date(amendment.createdAt).toLocaleString()}
            </div>
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/amendments/new">
          <ListGroupItem as="button">
            <h4>
              <b>{"\uFF0B"}</b> Submit New APS
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>APS Submission App</h1>
        <p>
          ACME's Amendment to Planned Settlement (APS) submission application
        </p>
      </div>
    );
  }

  function renderAmendments() {
    return (
      <div className="amendments">
        <PageHeader>Your APS Submissions</PageHeader>
        <ListGroup>{!isLoading && renderAmendmentsList(amendments)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home" data-testid="Home-Container">
      {isAuthenticated ? renderAmendments() : renderLander()}
    </div>
  );
}
