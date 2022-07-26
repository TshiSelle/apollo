import React, { useState, useCallback, useEffect } from "react";
import { FilterPages } from "../../api/ApiClient";
import { Alert, Button, Collapse, Form, Pagination } from "react-bootstrap";
import Pages from "./Pages";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styled from "styled-components";
import "./PageSearch.css";

const searchPages = () => {
  const [query, setQuery] = useState("");
  const [pageTitleoption, setPageTitleOption] = useState("");
  const [pageNumberoption, setpageNumberOption] = useState(1);
  const [numOfPages, setnumOfPages] = useState(null);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const pagesTitles = [
    "Marriage and Family",
    "Addiction",
    "Behavioral",
    "Divorce",
    "Child",
    "Clinical",
    "Cognitive",
    "Cognitive-behavioral",
    "Eating disorder",
    "Exercise",
    "Youth",
    "Social work",
    "School",
    "Trauma",
    "Nutritional",
    "Dialectical",
    "Psychodynamic",
  ];

  useEffect(
    (event) => {
      // console.log(pageTitleoption)
      if (event) event.preventDefault();
      setLoading(true);
      FilterPages(
        query,
        pageTitleoption,
        pageNumberoption
      )
        .then((response) => {
          if (response.data.success && response.data.numOfResults > 0) {
            const { searchResults, numOfPages } = response.data;
            setData(searchResults);
            setnumOfPages(numOfPages);
            setItems(
              calcPages(pageNumberoption, numOfPages, setpageNumberOption)
            );
            setError("");
          } else {
            setError("No such pages.");
            setpageNumberOption(1);
            setData([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          const { message } = error.response.data;
          if (message.includes("large")) {
            setError(message + " Redirecting to first page...");
            setTimeout(() => {
              setpageNumberOption(1);
              setLoading(false);
            }, 2000);
          } else {
            setError(message);
            setLoading(false);
          }
          setData([]);
          return;
        });
    },
    [
      query,
      pageTitleoption,
      pageNumberoption,
    ]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNumberoption]);

  const setQueryValue = useCallback((e) => setQuery(e.target.value));

  return (
    <PageContainer>
      <PageBanner>
        <BannerHeader>Search Pagess</BannerHeader>
        <BannerPara>
          Search for a specific page by its title
        </BannerPara>
      </PageBanner>

      <Form className="pageSearch" onSubmit={(e) => e.preventDefault()}>
        <div className="searchBar">
          <Form.Control
            className="searchField"
            type="text"
            value={query}
            isInvalid={error}
            placleholder="Search..."
            name="Search For Pagess"
            id="search"
            onChange={setQueryValue}
          />
          <label htmlFor="search"></label>
          <Button className="optionBtn" onClick={() => setOpen(!open)}>
            Options{" "}
          </Button>
        </div>
        <Collapse in={open} className="collapsible">
          <Form.Group>
            <Form.Select
              as="select"
              className="dropdown dropdown-option dropdown-page"
              value={pageTitleoption}
              onChange={(e) => setPageTitleOption(e.target.value)}
            >
              <option key="" value="">
                Page title (Any)
              </option>
              {pageTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Collapse>
      </Form>
      {isLoading ? (
        <LoadingSpinner display={isLoading} />
      ) : (
        <>
          <div className="page-parent-container">
            {data.map((page, key) => {
              return (
                <div key={key} className="page-container">
                  <PageCard page={page} />
                </div>
              );
            })}
          </div>
          <div className="pagesContainer">
            <Pages
              items={items}
              numOfPages={numOfPages}
              currpage={pageNumberoption}
              onChange={(e) => setpageNumberOption(e)}
            />
          </div>
        </>
      )}

      {error && (
        <div style={{ paddingTop: 20, flex: 1 }}>
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
    </PageContainer>
  );
};

export default searchPages;

const PageContainer = styled.div`
  font-family: FuturaLight;
  line-height: 1.5;
  color: #212529;
`;

const PageBanner = styled.div`
  height: 200px;
  text-align: center;
  display: grid;
  align-content: center;
  justify-content: center;

  @media (max-width: 991px) {
    height: unset;
    padding: 20px;
  }
`;

const BannerHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

const BannerPara = styled.p`
  max-width: 600px;
  margin-top: 10px;
`;

function calcPages(pageNumberoption, numOfPages, setpageNumberOption) {
  const showNumbers = 7;
  const start =
    pageNumberoption <= Math.floor(showNumbers / 2)
      ? 1
      : pageNumberoption - Math.floor(showNumbers / 2);
  const end =
    pageNumberoption + Math.floor(showNumbers / 2) > numOfPages
      ? numOfPages
      : pageNumberoption + Math.floor(showNumbers / 2);
  let pages = [];
  for (let number = start; number <= end; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === pageNumberoption}
        onClick={(e) => setpageNumberOption(+e.target.text)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return pages;
}
