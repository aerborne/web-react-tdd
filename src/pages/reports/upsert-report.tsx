import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
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
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      console.log("SIDE EFFECT CALLED");
      const result = await getDocumentByIdAPI(id);
      const doc = result?.data?.result || {};
      const newValues = formFields
        // .filter(({ type }: { type: string }) => type === "editor")
        .reduce((o, v) => {
          o[v.field] = id && doc ? (doc || [])[v?.field] || "" : "";
          return o;
        }, {});

      setMounted(true);
      setState(newValues);
      setDataLoading(false);
    };
    if (!!id && !mounted) {
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

  const onSubmit: SubmitHandler<ReportFormInput> = async (data) => {
    setLoading(true);
    try {
      const result = await storeDocumentAPI({ ...data, ...state });
      if (result.status === 201) {
        // localStorage.setItem("user_access_token", result?.data?.access_token);
        // localStorage.setItem("user_info", JSON.stringify(result?.data?.user));
        // localStorage.setItem("user_roles", JSON.stringify(result?.data?.roles));
        navigate("/report");
      } else {
        return setErrorMessage("Something Happened");
      }
    } catch (err) {
      setErrorMessage(JSON.stringify(err));
    }
    setLoading(false);
  };

  if (!!id && dataLoading && !mounted) {
    return <Loader />;
  }

  return (
    <Container>
      {errorMessage && (
        <Row>
          <Col>
            <div className="alert alert-danger mt-5">{errorMessage}</div>
          </Col>
        </Row>
      )}
      <Row className="vh100 align-items-center justify-items-center my-5">
        <Col>
          <Panel title={`${id ? "Update Report" : "Add Report"}`}>
            <form
              className="form-group add-report"
              onSubmit={handleSubmit(onSubmit)}
            >
              {renderFields()}
              <input
                type="submit"
                disabled={loading}
                value="Save"
                className="mt-3 btn-darkblue"
              />
            </form>
          </Panel>
        </Col>
      </Row>
    </Container>
  );
};