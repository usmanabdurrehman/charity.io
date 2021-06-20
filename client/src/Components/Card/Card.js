import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from "@material-ui/icons/Star";

import styles from "./Card.module.css";

import { useDispatch, useSelector } from "react-redux";

export default function Card({
	event: {
		_id,
		name,
		zipcode,
		start,
		end,
		image,
		volunteers,
	},
	page,
}) {
	// let alert = useAlert()
	let dispatch = useDispatch();

	let favItem = () => {
		axios({
			method: "post",
			url: "/user/addFavourite",
			withCredentials: true,
			data: { id: _id },
		}).then((res) => {
			if (res.data.status) {
				dispatch({ type: "ADD_FAV", payload: { id: _id } });
			}
		});
	};

	let unfavItem = () => {
		axios({
			method: "post",
			url: "/user/removeFavourite",
			withCredentials: true,
			data: { id: _id },
		}).then((res) => {
			if (res.data.status) {
				// new Audio('sounds/fav.mp3').play()
				dispatch({ type: "REMOVE_FAV", payload: { id: _id } });
				dispatch({
					type: "REMOVE_FROM_FAV_ITEM",
					payload: { id: _id },
				});
			}
		});
	};

	let deleteItem = () => {
		axios({
			method: "post",
			url: "/user/deleteItem",
			withCredentials: true,
			data: { id: _id },
		}).then((res) => {
			if (res.data.status) {
				new Audio("sounds/delete.mp3").play();
				dispatch({ type: "DELETE_ITEM", payload: { id: _id } });
				// alert.success('Item successfully deleted')
			} else {
				// alert.error(res.data.msg)
			}
		});
	};

	return (
		<div className={styles.card}>
			<div className={styles.cardImg}>
				<img
					src={`http://localhost:7000/eventImages/${image}`}
					alt=""
				/>
			</div>
			<div className={styles.cardDesc}>
				<div className={styles.cardName}>
					<h3>{name}</h3>
					<p>#{zipcode}</p>
				</div>

				<div className={styles.cardFooter}>
					<div className={styles.location}>{start}</div>
					<div className={styles.date}>{end}</div>
				</div>

				<Link
					to={`/item/${_id}`}
					className={`${styles.icon} ${styles.arrow}`}
				>
					<IconButton>
						<ArrowForwardIcon />
					</IconButton>
				</Link>
			</div>
			{page == "self" ? (
				<>
					<Link
						to={{
							pathname: "/editItem",
							state: {
								item: {
									_id,
									name,
									start,
									end,
									zipcode,
									image,
								},
							},
						}}
					>
						<IconButton className={`${styles.icon} ${styles.edit}`}>
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton
						className={`${styles.icon} ${styles.delete}`}
						onClick={deleteItem}
					>
						<DeleteIcon className={styles.deleteIcon} />
					</IconButton>
				</>
			) : null}
		</div>
	);
}
