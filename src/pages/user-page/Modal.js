import React, { useState } from "react";
import { Button, Col, Input, Modal, Row, Typography } from "antd";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const { Title } = Typography;

const ModalEmailFormat = ({ isVisible, onSubmit, onClose }) => {
  const [editorState, setEditorState] = useState("");
  const [subject, setSubject] = useState("");

  const handleChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSubmitAndBlast = () => {
    onSubmit({
      emailSubject: subject,
      emailContent: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
  };

  return (
    <Modal visible={isVisible} onCancel={onClose} footer={null} width={600}>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Title>Email Content</Title>
        </Col>
        <Col span={24}>
          <Typography style={{ marginBottom: "5px" }}>Subject:</Typography>
          <Input
            placeholder="Subject"
            size="large"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Col>
        <Col span={24}>
          <Typography style={{ marginBottom: "5px" }}>Email body:</Typography>
          <Editor
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            editorStyle={{
              backgroundColor: "white",
              height: "200px",
              marginBottom: "30px",
              border: "1px solid #F1F1F1",
              padding: "4px 10px",
            }}
            onEditorStateChange={handleChange}
            editorState={editorState}
          />
        </Col>

        <Col span={24} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleSubmitAndBlast} type="primary">
            Submit & Blast
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalEmailFormat;
