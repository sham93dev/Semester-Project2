import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import AdminMenu from "../AdminMenu";
import { BASE_URL } from "../../../constants/api";
import { Spinner } from "react-bootstrap";
import InformationModal from "../../../modals/InformationModal";
import AuthContext from "../../../context/AuthContext";
import { Container, Row, Col } from "react-bootstrap";
import {Form, Button} from "react-bootstrap"

const schema = yup.object().shape({
	title: yup.string().required("Enter title of article").min(5, "Minimum 5 characters required"),
	category: yup.string().required("Please enter an category"),
	description: yup.string().required("Enter your article content").min(10, "Minimum 5 characters required"),
	author: yup.string().required("Please name of Author"),
	info: yup.string().required("Write short desciprtion").min(5, "Minimum 5 characters required"),
});

export default function UpdatePost() {
	const [info, setInfo] = useState(null);
	const [modal, setModal] = useState(false);
	const [fetching, setFetching] = useState(true);
	const [updateContent, setUpdateContent] = useState(false);
	const [error, setError] = useState(null);
	const [updatingFail, setUpdatingError] = useState(null);
    const [auth] = useContext(AuthContext);

    const headers = {
      headers: {
        Authorization: `Bearer ${auth.jwt}`,
      },
    };


	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});


	let { id } = useParams();
	const url = `${BASE_URL}/${id}`;
    const history = useHistory();

	useEffect(
		function () {
			async function getInformation() {
				try {
					const response = await axios.get(url);
					console.log("response", response.data);
					setInfo(response.data);
				} catch (error) {
					console.log(error);
					setError(error.toString());
				} finally {
					setFetching(false);
				}
			}

			getInformation();
		},
	
		[]
	);

	async function onSubmit(data) {
		setUpdateContent(true);
		setUpdatingError(null);
		setModal(false);

		console.log(data);

		try {
			const response = await axios.put(url, data, headers);
			console.log("response", response.data);
			setModal(true);
		} catch (error) {
			console.log("error", error);
			setUpdatingError(error.toString());
		} finally {
			setUpdateContent(false);
		}
	}

	if (fetching) return (<div className="spinner-blue">
    <Spinner animation="grow" variant="info" size="large" />
    <h4>Loading post, Please wait</h4>
  </div>);

	if (error) return <div>Error loading post</div>;

	return (
        <>
		<AdminMenu />
		<section className="create-form-wrapper">
        <Container>
            <Row className="form-design">
            <Col className="col-md-12 col-design">
			<h3>Edit Post</h3>
				{modal && <InformationModal show={modal} />}
				{updatingFail && <div className="errors">{updatingFail}</div>}
				<Form onSubmit={handleSubmit(onSubmit)} className="create-form">
				<fieldset disabled={updateContent}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control name="name" defaultValue={info.title}  placeholder="Title:" {...register("title")} />
                  {errors?.title && <span>{errors?.title.message}</span>}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control name="category" defaultValue={info.category}  placeholder="Category:" {...register("category")} />
                  {errors?.category && <span>{errors?.category.message}</span>}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Author</Form.Label>
                  <Form.Control name="author" defaultValue={info.author}  placeholder="Author:" {...register("author")} />
                  {errors?.category && <span>{errors?.category.message}</span>}
                </Form.Group>
				<Form.Group>
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control name="info" defaultValue={info.info} as="textarea" rows="3" placeholder="Info:" {...register("info")} />
                  {errors?.info && <span>{errors?.info.message}</span>}
                </Form.Group>
				<Form.Group>
                  <Form.Label>Content</Form.Label>
                  <Form.Control name="description" defaultValue={info.description} as="textarea" rows="5" placeholder="Description:" {...register("description")} />
                  {errors?.info && <span>{errors?.info.message}</span>}
                </Form.Group>
				<Button className="submit-btn" type="submit">
                  Update Post
                </Button>
                    <InformationModal
                  show={modal}
                  onHide={() => {
                   setModal(false);
                   history.push("/adminpage/posts");
                  }}
                />
				</fieldset>
				</Form>
                </Col>
            </Row>
            </Container>
			</section>
		</>
	);
}
