import React, { useState } from "react";
import { Container, Row, Col, Button, Breadcrumb } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";

import Panel from "../../components/shared/panel";
import {
  storeDocumentAPI,
  getDocumentByIdAPI,
  updateDocumentAPI,
} from "../../components/api/index";
import formFields from "../../components/utils/report-fields";

import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";
import Loader from "../../components/shared/loader";

interface ReportFormInput {
  subject: string;
  sessionTitle: string;
  sessionStatus: string;
  sessionEndTime: string;
  sessionResumeTime: string;
}

export default () => {
  const { id } = useParams();
  const defaultFields = formFields
    // .filter(({ type }: { type: string }) => type === "editor")
    .reduce((o, v) => {
      o[v.field] = "";
      return o;
    }, {});
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = useState(defaultFields);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(!!id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      const result = await getDocumentByIdAPI(id);
      const doc = result?.data?.result || {};
      const newValues = formFields
        // .filter(({ type }: { type: string }) => type === "editor")
        .reduce((o, v) => {
          o[v.field] = id && doc ? (doc || [])[v?.field] || "" : "";
          return o;
        }, {});

      setState(newValues);
      setDataLoading(false);
    };
    if (!!id) {
      fetchData();
    }
  }, [setState, id, getDocumentByIdAPI, setDataLoading, formFields]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormInput>();

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const renderFields = () =>
    formFields.map(({ field, label, payload, type }) => {
      if (type === "editor") {
        return (
          <div key={field} className="input-group">
            <label>{label}</label>
            <ReactQuill
              theme="snow"
              formats={formats}
              modules={modules}
              value={state[field]}
              onChange={(v) => setState({ ...state, [field]: v })}
            />
          </div>
        );
      }
      return (
        <div key={field} className="input-group">
          <label>{label}</label>
          <input
            placeholder={label}
            {...register(field, {
              value: state[field],
              // payload: { ...payload, value: state[field] || "" },
            })}
          />
        </div>
      );
    });

  const onClose = () => {
    navigate(id ? `/report/view/${id}` : "/report");
  };

  const onSubmit: SubmitHandler<ReportFormInput> = async (data) => {
    setLoading(true);
    try {
      const submitAPI = id ? updateDocumentAPI : storeDocumentAPI;
      const result = await submitAPI({ ...state, ...data, id }, id);
      if (result.status === (!!id ? 200 : 201)) {
        // localStorage.setItem("user_access_token", result?.data?.access_token);
        // localStorage.setItem("user_info", JSON.stringify(result?.data?.user));
        // localStorage.setItem("user_roles", JSON.stringify(result?.data?.roles));
        navigate(`/report/view/${id ? id : result?.data?.result?.id}`);
      } else {
        return setErrorMessage("Something Happened");
      }
    } catch (err) {
      setErrorMessage(JSON.stringify(err));
    }
    setLoading(false);
  };

  if (!!id && dataLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="app-breadcrumb">
        <Container>
          <Row className="pt-3">
            <Col className="align-items-center">
              <Breadcrumb>
                <Breadcrumb.Item href="/report">Reports</Breadcrumb.Item>
                <Breadcrumb.Item active>
                  {!!id ? "Update" : "Create"}
                </Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        {errorMessage && (
          <Row>
            <Col>
              <div className="alert alert-danger mt-5">{errorMessage}</div>
            </Col>
          </Row>
        )}
        <Row className="align-items-center justify-items-center my-4">
          <Col>
            <Panel title={`${id ? "Update Report" : "Create Report"}`}>
              <form
                className="form-group add-report"
                onSubmit={handleSubmit(onSubmit)}
              >
                {renderFields()}
                <Row>
                  <div className="btn-group col-6 ml-auto">
                    {/* <Link
                  to={`/report/view/${id}`}
                  disabled={loading}
                  className="mt-3 btn-darkblue px-4"
                >
                  {"Cancel"}
                </Link> */}
                    <Button
                      variant="gray"
                      className="mt-3 px-4 mr-3"
                      onClick={onClose}
                    >
                      {"Cancel"}
                    </Button>

                    <Button
                      variant="teal"
                      type="submit"
                      disabled={loading}
                      className="mt-3 px-4"
                    >
                      {loading ? "Loading..." : id ? "Update" : "Save"}
                    </Button>
                  </div>
                </Row>
              </form>
            </Panel>
          </Col>
        </Row>
      </Container>
    </>
  );
};
