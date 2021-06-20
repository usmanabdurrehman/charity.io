import React,{useState} from 'react'
// import './Forms.css'

export default function Form(props) {

	return (
		<div className='form'>
			{(props.imageLeft==true)?
			(
				<>
				<div className='form-image'>
					<img src={props.image}/>
				</div>
				<div className='form-fields'>
					<div>
						{props.children}
					</div>
				</div>
				</>
			):
			(
				<>
				<div className='form-fields'>
					<div>
						{props.children}
					</div>
				</div>
				<div className='form-image'>
					<img src={props.image}/>
				</div>
				</>
			)}
		</div>
	)
}