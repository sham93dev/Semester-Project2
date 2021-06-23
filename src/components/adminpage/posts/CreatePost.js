import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import InformationModal from "../../../modals/InformationModal";
import { BASE_URL } from "../../../constants/api";
import AdminMenu from "../AdminMenu";

const schema = yup.object().shape({
  title: yup.string().required("Enter title of article").min(5, "Minimum 5 characters required"),
  category: yup.string().required("Please enter an category"),
  description: yup.string().required("Enter your article content").min(10, "Minimum 5 characters required"),
  author: yup.string().required("Please name of Author"),
  info: yup.string().required("Write short desciprtion").min(5, "Minimum 5 characters required"),
});

export default function CreatePost() {
  const [info, setInfo] = useState(null);
  const [modal, setModal] = useState(false);
  const [infoError, setInfoError] = useState(false);
  const [auth] = useContext(AuthContext);

  const headers = {
    headers: {
      Authorization: `Bearer ${auth.jwt}`,
    },
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setInfoError(false);
    if(!info) {
      setInfoError(true);
      return;
    }
    const formData = new FormData();
    formData.append("files.image", info, info.name);
    formData.append("data", JSON.stringify(data));
    console.log(formData);

    try {
      await axios.post(BASE_URL, formData, headers);
    } catch (error) {
      console.log("error", error);
    } finally {
      setModal(true);
    }
  }

  return (
    <>
      <AdminMenu />
      <section className="create-form-wrapper">
      <Container >
        <Row className="form-design">
          <Col className="col-lg-12 col-design ">
            <h3>New Post</h3>
            {modal && <InformationModal show={modal} />}
            <Form onSubmit={handleSubmit(onSubmit)} className="create-form">
          
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control name="title" placeholder="Article title:" {...register("title")} />
                  {errors?.title && <span>{errors?.title.message}</span>}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control name="category" placeholder="Choose type of article" as="select" {...register("category")}>
                    <option value=""> Choose Category</option>
                    <option value="HTML"> HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JAVASCRIPT">JavaScript</option>
                    <option value="STRAPI">Strapi</option>
                    <option value="BOOTSTRAP">Bootstrap</option>
                    <option value="REACT">React</option>
                  </Form.Control>
                  {errors?.category && <span>{errors?.category.message}</span>}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control name="info" placeholder="Keep it short:" {...register("info")} />
                  {errors?.info && <span>{errors?.info.message}</span>}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Author</Form.Label>
                  <Form.Control name="author" placeholder="Name of Author" {...register("author")} />
                  {errors?.author && <span>{errors?.author.message}</span>}
                </Form.Group>
                <input type="file" onChange={(event) => {
                  setInfo(event.target.files[0]);
                   setInfoError(false);
                  }}/>
                {infoError && <span>Please upload a file</span>}
                <Form.Group>
                  <Form.Label>Content of Article</Form.Label>
                  <Form.Control name="description" as="textarea" rows="5" placeholder="Your description.." {...register("description")} />
                  {errors?.description && <span>{errors?.description.message}</span>}
                </Form.Group>
                <Button className="submit-btn" type="submit">
                  Submit
                </Button>
                <InformationModal
                  show={modal}
                  onHide={() => {
                    setModal(false);
                    window.location.reload();
                  }}
                />
            </Form>
          </Col>
        </Row>
      </Container>
      </section>
    </>
  );
}
