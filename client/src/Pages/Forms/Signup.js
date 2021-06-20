import React, { useState, useEffect } from "react";
import styles from "./Forms.module.css";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

import SwipeableViews from "react-swipeable-views";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { useToasts } from "react-toast-notifications";

export default function Signup() {
	let [index, setIndex] = useState(0);

	let [submitDisabled, setSubmitDisabled] = useState(true);

	let handleChange = (event, value) => {
		setIndex(value);
	};

	let handleChangeIndex = (index) => {
		setIndex(index);
	};

	let [fields, setFields] = useState({
		fname: "",
		lname: "",
		email: "",
		pwd: "",
		role: "volunteer",
		image: "",
		imgUrl: "",
	});

	const { addToast } = useToasts();

	let [redirect, setRedirect] = useState(false);

	let { fname, lname, email, pwd, image, role } = fields;

	let formdata = new FormData();
	formdata.append("fname", fname);
	formdata.append("lname", lname);
	formdata.append("email", email);
	formdata.append("pwd", pwd);
	formdata.append("role", role);
	formdata.append("image", image);

	let clickHandler = () => {
		axios({
			url: "/signup",
			method: "post",
			withCredentials: true,
			data: formdata,
		}).then((res) => {
			if (res.data.status) {
				setRedirect(true);
			} else {
				let { msg, appearance } = res.data;
				addToast(msg, { appearance });
			}
		});
	};

	let imageOnChange = (e) => {
		if (e.target.files[0]) {
			let imgUrl = URL.createObjectURL(e.target.files[0]);
			setFields({ ...fields, image: e.target.files[0], imgUrl });
		}
	};

	useEffect(() => {
		if (
			fields.fname &&
			fields.lname &&
			fields.email &&
			fields.pwd &&
			fields.image
		) {
			setSubmitDisabled(false);
		} else {
			setSubmitDisabled(true);
		}
	}, [fields]);

	return (
		<div className={styles.formWrapper}>
			<div className={styles.form}>
				<div className={styles.formImage}>
					<img src="signup.jpg" />
				</div>
				<div className={styles.formFields}>
					<div>
						<h1>Sign Up</h1>
						<SwipeableViews
							index={index}
							onChangeIndex={handleChangeIndex}
							slideClassName={styles.swipeableViewsDiv}
						>
							<div>
								<TextField
									onChange={(e) =>
										setFields({
											...fields,
											fname: e.target.value,
										})
									}
									label="First Name"
									className={styles.formInput}
									fullWidth
								/>
								<TextField
									onChange={(e) =>
										setFields({
											...fields,
											lname: e.target.value,
										})
									}
									label="Last Name"
									className={styles.formInput}
									fullWidth
								/>
								<TextField
									onChange={(e) =>
										setFields({
											...fields,
											email: e.target.value,
										})
									}
									label="Email"
									className={styles.formInput}
									fullWidth
								/>
								<TextField
									onChange={(e) =>
										setFields({
											...fields,
											pwd: e.target.value,
										})
									}
									type="password"
									label="Password"
									className={styles.formInput}
									fullWidth
								/>
								<FormControl
									required
									className={styles.formInput}
								>
									<InputLabel id="demo-simple-select-required-label">
										Signup As
									</InputLabel>
									<Select
										labelId="demo-simple-select-required-label"
										id="demo-simple-select-required"
										value={fields.role}
										onChange={(e) =>
											setFields({
												...fields,
												role: e.target.value,
											})
										}
									>
										<MenuItem value={"charity"}>
											Charity
										</MenuItem>
										<MenuItem value={"volunteer"}>
											Volunteer
										</MenuItem>
									</Select>
								</FormControl>
							</div>
							<div className={styles.profileImageWrapper}>
								<div className={styles.fileWrapper}>
									<input
										type="file"
										id={styles.image}
										onChange={imageOnChange}
									/>
									<label for={styles.image}>
										<img
											src={
												fields.imgUrl
													? fields.imgUrl
													: "default.jpg"
											}
										/>
									</label>
								</div>
							</div>
						</SwipeableViews>
						<Button
							onClick={(e) => {
								index == 0 ? setIndex(1) : setIndex(0);
							}}
							className={styles.formButton}
						>
							{index == 0 ? "Next" : "Prev"}
						</Button>
						<Button
							disabled={submitDisabled}
							onClick={clickHandler}
							fullWidth
							className={styles.submitBtn}
							variant="contained"
						>
							Sign up
						</Button>
						<p className={styles.formRedirectionLine}>
							Already have an account?{" "}
							<Link to="/signin">Signin</Link>
						</p>
					</div>
				</div>
			</div>
			{redirect && (
				<Redirect
					to={{
						pathname: "/signin",
						state: {
							msg: "Signup Successful. You can now sign in",
							appearance: "success",
						},
					}}
				/>
			)}
		</div>
	);
}
