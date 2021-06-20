import React, { useState, useEffect } from "react";
import styles from "./Forms.module.css";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";

import { useToasts } from "react-toast-notifications";

export default function Signin(props) {
	let [fields, setFields] = useState({
		email: "",
		pwd: "",
	});

	let dispatch = useDispatch()
	const { addToast } = useToasts();

	let [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (props?.location?.state) {
			let { msg, appearance } = props.location.state;
			addToast(msg, { appearance });
		}
	}, []);

	let clickHandler = () => {
		axios({
			method: "post",
			url: "/signin",
			withCredentials: true,
			data: fields,
		}).then((res) => {
			let { token, auth, user } = res.data;
			if (auth == true) {
				localStorage.setItem("token", token);
				dispatch({type:'SET_USER',payload:user})
				props.history.push("/home")
			} else {
				let { msg, appearance } = res.data;
				addToast(msg, { appearance });
			}
		});
	};

	return (
		<div className={styles.formWrapper}>
			<div className={`${styles.form} ${styles.leftForm}`}>
				<div className={styles.formFields}>
					<div>
						<h1>Sign In</h1>
						<TextField
							onChange={(e) =>
								setFields({ ...fields, email: e.target.value })
							}
							label="Email"
							className={styles.formInput}
							fullWidth
						/>
						<TextField
							onChange={(e) =>
								setFields({ ...fields, pwd: e.target.value })
							}
							type="password"
							label="Password"
							className={styles.formInput}
							fullWidth
						/>
						<Button
							onClick={clickHandler}
							className={styles.formButton}
							variant="contained"
						>
							Sign In
						</Button>
						<p className={styles.formRedirectionLine}>
							Not a user? <Link to="/signup">Signup</Link>
						</p>
					</div>
				</div>
				<div className="form-image">
					<img src="signin.jpg" />
				</div>
			</div>
		</div>
	);
}
