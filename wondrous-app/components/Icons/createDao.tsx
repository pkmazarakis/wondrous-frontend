import React from 'react'

export default function CreateDaoIcon({ circle = false }) {
	return (
		<svg
			width="25"
			height="25"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			{circle && <circle cx="12.7178" cy="12.0771" r="12" fill="#141414" />}
			<path
				d="M17.5492 14.2245V9.92985C17.549 9.74157 17.4993 9.55665 17.4051 9.39364C17.3109 9.23064 17.1754 9.09527 17.0124 9.00113L13.2546 6.8538C13.0913 6.75957 12.9062 6.70996 12.7177 6.70996C12.5293 6.70996 12.3441 6.75957 12.1809 6.8538L8.42306 9.00113C8.26001 9.09527 8.12457 9.23064 8.03035 9.39364C7.93613 9.55665 7.88642 9.74157 7.88623 9.92985V14.2245C7.88642 14.4128 7.93613 14.5977 8.03035 14.7607C8.12457 14.9237 8.26001 15.0591 8.42306 15.1532L12.1809 17.3006C12.3441 17.3948 12.5293 17.4444 12.7177 17.4444C12.9062 17.4444 13.0913 17.3948 13.2546 17.3006L17.0124 15.1532C17.1754 15.0591 17.3109 14.9237 17.4051 14.7607C17.4993 14.5977 17.549 14.4128 17.5492 14.2245Z"
				stroke="#7A7A7A"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}