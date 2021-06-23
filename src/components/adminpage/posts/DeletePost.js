import { useState, useContext } from "react";
import { BASE_URL } from "../../../constants/api";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { useHistory } from "react-router";


export default function DeletePost({ id }) {
	const [error, setError] = useState(null);
    const [auth] = useContext(AuthContext);
    const history = useHistory();
    const headers = {
      headers: {
        Authorization: `Bearer ${auth.jwt}`,
      },
    };

	const url = `${BASE_URL}/${id}`;

	async function deleteContent() {
		try {
			await axios.delete(url, headers);
            history.go(0);
		} catch (error) {
			setError(error);
		}
	}

	return (
		<button type="button" className="delete-button" onClick={deleteContent}>
			{error ? "Error" : "Delete Post"}
		</button>
	);
}


