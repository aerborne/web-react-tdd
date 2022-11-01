import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";

import Panel from "../../components/shared/panel";
import { storeDocumentAPI } from "../../components/api/index";

import "react-quill/dist/quill.snow.css";

interface ReportFormInput {
  subject: string;
  sessionTitle: string;
  sessionStatus: string;
  sessionEndTime: string;
  sessionResumeTime: string;
}

export default () => {
  const formFields = [
    {
      label: "Subject",
      field: "subject",
      type: "text",
      payload: {
        required: true,
      },
    },
    {
      label: "Session Title",
      field: "session_title",
      type: "text",

      payload: {
        required: true,
      },
    },
    {
      label: "Session Status",
      field: "session_status",
      type: "text",
      payload: {
        required: true,
      },
    },
    {
      label: "Session End Time",
      field: "session_end",
      type: "text",
      payload: {
        required: true,
      },
    },
    {
      label: "Session Resume Time",
      field: "session_resume",
      type: "text",
      payload: {
        required: true,
      },
    },
    {
      label: "Privilege Hour",
      field: "privilege_hour",
      type: "editor",
      payload: {},
    },
    {
      label: "RATIFICATION OF BICAM REPORT",
      field: "ratification",
      type: "editor",
      payload: {},
    },
    {
      label: "BILLS APPROVED ON THIRD READING",
      field: "bills_approved_on_third_hearing",
      type: "editor",
      payload: {},
    },
    {
      label: "CONCURRED WITH SENATE AMMENDMENTS",
      field: "concurred_with_senate_ammendments",
      type: "editor",
      payload: {},
    },
    {
      label: "RESOLUTIONS ADOPTED",
      field: "resolutions_adopted",
      type: "editor",
      payload: {},
    },
    {
      label: "BILLS CONSIDERED ON SECOND READING",
      field: "bills_considered_on_second_reading",
      type: "editor",
      payload: {},
    },
    {
      label: "ELECTED TO THE BICAMERAL CONFERENCE",
      field: "elected_to_the_bicameral_conference",
      type: "editor",
      payload: {},
    },
    {
      label: "COMMITTEE",
      field: "committee",
      type: "editor",
      payload: {},
    },
    {
      label: "OTHER MATTERS",
      field: "other_matters",
      type: "editor",
      payload: {},
    },
  ];
  const defaultFields = formFields
    .filter(({ type }) => type === "editor")
    .reduce((o, v) => {
      o[v.field] = "";
      return o;
    }, {});
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = useState(defaultFields);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
          <input placeholder={label} {...register(field, payload)} />
        </div>
      );
    });

  const onSubmit: SubmitHandler<ReportFormInput> = async (data) => {
    setLoading(true);
    try {
      const result = await storeDocumentAPI({ ...data, ...state });
      console.log({ result });
      if (result.status === 201) {
        // localStorage.setItem("user_access_token", result?.data?.access_token);
        // localStorage.setItem("user_info", JSON.stringify(result?.data?.user));
        // localStorage.setItem("user_roles", JSON.stringify(result?.data?.roles));
        // navigate("/");
      } else {
        return setErrorMessage("Invalid Email and Password ");
      }
    } catch (err) {
      setErrorMessage("Invalid Email and Password ");
    }
    setLoading(false);
  };

  return (
    <Container>
      <Row className="vh100 align-items-center justify-items-center my-5">
        <Col>
          <Panel title="Add Report">
            <form
              className="form-group add-report"
              onSubmit={handleSubmit(onSubmit)}
            >
              {renderFields()}
              <input type="submit" value="Save" className="mt-3 btn-darkblue" />
            </form>
          </Panel>
        </Col>
      </Row>
    </Container>
  );
};
