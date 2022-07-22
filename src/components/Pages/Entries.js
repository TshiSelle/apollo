import React, { useCallback, useState, useRef, useEffect } from "react";
import { usePage } from "../../context/PageContext";
import { CreatePage } from "../../api/apiClient";
import { useAuthenticator } from "../../context/AuthContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Tabs.css";
import "../Fonts/icomoon/style.css";

const PageEntries = ({ setError, setMessage }) => {
  const {
    pageEntries,
    removePageEntries,
    updatePageEntry,
    updatePageEntries,
  } = usePage();
  const { authToken } = useAuthenticator();
  const [newEntry, setNewEntry] = useState(false);
  const [newBody, setNewBody] = useState(undefined);
  const [tabIndex, setTabIndex] = useState(0);
  const [newTitle, setNewTitle] = useState(undefined);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const fieldRef = useRef();
  const tabs = [];
  const tabPanels = [];

  useEffect(() => {
    if (pageEntries?.length === 0) setNewEntry(true);
  }, [pageEntries]);

  const addNewPageEntry = useCallback(
    (title, body) => {
      try {
        CreatePage(authToken, title, body)
          .then((response) => {
            if (response.data.success) {
              updatePageEntries();
              setMessage("Successfully created your page!");
            } else {
              console.log(response.data.message);
              setError(response.data.message);
            }
          })
          .catch((error) => {
            setError(error.response.data.message);
            return;
          });
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    [authToken]
  );

  const handleBodyOnChange = (e) => {
    setNewBody(e.target.value);
  };
  const handleTitleOnChange = (e) => {
    setNewTitle(e.target.value);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (newBody && newTitle && newBody.trim().length > 0) {
      addNewPageEntry(newTitle, newBody);
    }
    updatePageEntries();
    setNewTitle("");
    setNewBody("");
  };
  const editPageEntry = useCallback(() => {
    setIsEditEnabled(true);
  }, [setIsEditEnabled]);

  const handleUpdateEntry = useCallback(
    (id, title, body) => {
      updatePageEntry(id, title, body);
      setIsEditEnabled(false);
    },
    [updatePageEntry, setIsEditEnabled]
  );

  const handleNewPage = () => {
    setNewEntry(true);
    setTabIndex(pageEntries.length);
  };

  pageEntries &&
    pageEntries.forEach(({ _id, title, body, createdAt, modifiedAt }) => {
      if (!_id) return;
      tabs.push(
        <Tab key={_id} disabled={isEditEnabled}>
          <p style={{ margin: "0" }}>{title}</p>
          <p style={{ fontSize: "12px", margin: "0" }}>
            {createdAt.substring(0, 10)}
          </p>
        </Tab>
      );
      tabPanels.push(
        <TabPanel key={_id}>
          {isEditEnabled ? (
            <div style={{ padding: "25px" }}>
              <h1 class="edit-header">Edit Title:</h1>
              <textarea
                className="form-control text-area"
                defaultValue={title}
                onChange={handleTitleOnChange}
                type="text"
                id="title"
                rows={1}
                maxLength={30}
                ref={fieldRef}
              />
              <h1 class="edit-header">Edit body:</h1>
              <textarea
                className="form-control text-area"
                defaultValue={body}
                onChange={handleBodyOnChange}
                type="text"
                id="body"
                rows={11}
                ref={fieldRef}
              />
              <form>
                <div>
                  <button
                    className="btn btn-sm cancel-button"
                    onClick={() => setIsEditEnabled(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm confirm-button"
                    type="submit"
                    onClick={() =>
                      handleUpdateEntry(_id, newTitle || title, newBody || body)
                    }
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bodyAndButtonsContainer">
              <div>
                <h1 className="entry-title">{title}</h1>
                <p style={{ marginBottom: "25px" }}>
                  Date: {createdAt.substring(0, 10)}
                </p>
                <h5 className="entry-body">{body}</h5>
              </div>
              <div className="button-holder">
                <button
                  className="btn btn-sm new-page-button"
                  onClick={handleNewPage}
                >
                  <div></div>
                </button>
                <button
                  className="btn btn-sm edit-entry-button"
                  onClick={editPageEntry}
                >
                  <div></div>
                </button>
                <button
                  className="btn btn-sm delete-entry-button"
                  onClick={() => removePageEntries(_id)}
                >
                  <div></div>
                </button>
              </div>
            </div>
          )}
          <div></div>
        </TabPanel>
      );
    });
  const reversedTabPanels = tabPanels.reverse();
  const reversedTabs = tabs.reverse();

  reversedTabs.push(<Tab disabled={isEditEnabled} key={1}></Tab>);
  reversedTabPanels.push(
    <TabPanel key={1} style={{ padding: "25px" }}>
      <textarea
        className="form-control text-area"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        type="text"
        rows={1}
        id="title"
        maxLength={15}
        placeholder="Title"
        ref={fieldRef}
      />
      <textarea
        className="form-control text-area entry-text"
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
        type="text"
        id="body"
        rows={11}
        placeholder="Body"
        ref={fieldRef}
      />
      {newEntry && (
        <form style={{ display: "flex" }}>
          <button
            disabled={
              typeof newBody === "string" && newBody.trim().length === 0
            }
            className="btn form-control submit-entry-button"
            type="submit"
            onClick={handleOnSubmit}
          >
            Save Page
          </button>
        </form>
      )}
    </TabPanel>
  );

  return (
    <>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <div className="scroll">{reversedTabs}</div>
        </TabList>
        {reversedTabPanels}
      </Tabs>
    </>
  );
};

export default PageEntries;