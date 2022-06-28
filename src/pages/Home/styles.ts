import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
	display: flex;
	height: 50px;
`;

export const InputFile = styled.div`
	label {
		cursor: pointer;
		width: 180px;
		height: 100%;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		border: 4px solid #882231;
		color: #882231;
		transition: background-color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;

		input {
			display: none;
		}

		p {
			margin: 0;
			white-space: nowrap;
			max-width: 160px;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&:hover {
			background: ${shade(0.1, '#f2e9ea')};
		}
	}
`;

export const Button = styled.button`
	cursor: pointer;
	height: 100%;
	background: #882231;
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;
	border: 0;
	font-size: 16px;
	padding-left: 10px;
	padding-right: 10px;
	color: #fff;

	transition: 0.2s;

	&:hover {
		background: ${shade(0.2, '#882231')};
		color: ${shade(0.2, '#fff')};
	}

	&:focus {
		outline: thin dotted;
		outline: 0px auto -webkit-focus-ring-color;
		outline-offset: 0px;
	}
`;
