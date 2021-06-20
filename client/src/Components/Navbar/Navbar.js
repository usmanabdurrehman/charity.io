import React, { useState, useRef, useEffect } from "react";
import { Container } from "../";
import { Redirect, Link } from "react-router-dom";
import styles from "./Navbar.module.css";

import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StarIcon from "@material-ui/icons/Star";
import AddIcon from "@material-ui/icons/Add";

import { useSelector, useDispatch } from "react-redux";

import { classNames } from "utils";

export default function Navbar() {
	let [redirect, setRedirect] = useState(false);

	let user = useSelector((state) => state.user);
	let dispatch = useDispatch();

	let [sidebarOpen, setSidebarOpen] = useState(false);

	let clickHandler = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div className={styles.navbar}>
			<Container className={styles.navWrapper}>
				<div className={styles.logo}>
					<h2>
						<Link to={user ? "/home" : "/"}>Charity.io</Link>
					</h2>
				</div>
				<div className={styles.nav}>
					{user ? (
						<>
							<div>
								<Link to="/addEvent">
									<AddIcon style={{ color: "#008ecc" }} />{" "}
									<p>Add An Event</p>
								</Link>
							</div>
							<div>
								<Link to="/profile">
									<img
										src={
											user?.profileImg
												? `http://localhost:7000/profileImages/${user.profileImg}`
												: "default.jpg"
										}
										className={styles.profileImage}
									/>
									<p>Profile</p>
								</Link>
							</div>
							<div
								className={styles.logout}
								onClick={(e) => {
									localStorage.removeItem("token");
									dispatch({ type: "LOGOUT" });
									setRedirect(true);
								}}
							>
								<ExitToAppIcon />
							</div>
						</>
					) : (
						<>
							<div>
								<Link to="/signin">
									<p>Signin</p>
								</Link>
							</div>
							<div>
								<Link to="/signup">
									<p>Signup</p>
								</Link>
							</div>
						</>
					)}
				</div>
				<IconButton className={styles.hamburger} onClick={clickHandler}>
					{sidebarOpen ? (
						<CloseIcon className={styles.menuIcon} />
					) : (
						<MenuIcon className={styles.menuIcon} />
					)}
				</IconButton>
			</Container>
			{redirect ? <Redirect to="/signin" /> : null}
			<div
				className={classNames({
					[styles.sidebar]: true,
					[styles.sidebarOpen]: sidebarOpen,
				})}
			>
				<div>
					{user ? (
						<>
							<div>
								<Link to="/addEvent">
									<AddIcon style={{ color: "#008ecc" }} />{" "}
									<p>Add An Event</p>
								</Link>
							</div>
							<div>
								<Link to="/profile">
									<img
										src={
											user?.profileImg
												? `http://localhost:7000/profileImages/${user.profileImg}`
												: "default.jpg"
										}
										className={styles.profileImage}
									/>
									<p>Profile</p>
								</Link>
							</div>
							<div
								className={styles.logout}
								onClick={(e) => {
									localStorage.removeItem("token");
									dispatch({ type: "LOGOUT" });
									setRedirect(true);
								}}
							>
								<ExitToAppIcon />
							</div>
						</>
					) : (
						<>
							<div>
								<Link to="/signin">
									<p>Signin</p>
								</Link>
							</div>
							<div>
								<Link to="/signup">
									<p>Signup</p>
								</Link>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
