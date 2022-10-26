import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Panel from "../../components/shared/panel";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
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
      field: "sessionTitle",
      type: "text",

      payload: {
        required: true,
      },
    },
    {
      label: "Session Status",
      field: "sessionStatus",
      type: "text",
      payload: {
        required: true,
      },
    },
    {
      label: "Session End Time",
      field: "sessionEndTime",
      type: "text",
      payload: {
        required: true,
      },
    },
    {
      label: "Session Resume Time",
      field: "sessionResumeTime",
      type: "text",
      payload: {
        required: true,
      },
    },
    {
      label: "Privilege Hour",
      field: "privilegeHour",
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
      field: "billsApprovedOnThirdReading",
      type: "editor",
      payload: {},
    },
    {
      label: "CONCURRED WITH SENATE AMMENDMENTS",
      field: "concurredWithSenateAmmendments",
      type: "editor",
      payload: {},
    },
    {
      label: "RESOLUTIONS ADOPTED",
      field: "resolutionsAdopted",
      type: "editor",
      payload: {},
    },
    {
      label: "BILLS CONSIDERED ON SECOND READING",
      field: "billsConsideredOnSecondReading",
      type: "editor",
      payload: {},
    },
    {
      label: "ELECTED TO THE BICAMERAL CONFERENCE",
      field: "electedToTheBicameralConference",
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
      field: "otherMatters",
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
    console.log({ data, state });
    // try {
    //   const result = await loginAPI(data);
    //   if (result.status === 200) {
    //     localStorage.setItem("user_access_token", result?.data?.access_token);
    //     localStorage.setItem("user_info", JSON.stringify(result?.data?.user));
    //     localStorage.setItem("user_roles", JSON.stringify(result?.data?.roles));
    //     navigate("/");
    //   } else {
    //     return setErrorMessage("Invalid Email and Password ");
    //   }
    // } catch (err) {
    //   setErrorMessage("Invalid Email and Password ");
    // }
    setLoading(false);
  };

  return (
    <Container>
      <Row className="vh100 align-items-center justify-items-center">
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
