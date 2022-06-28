import styled from 'styled-components';
import { shade } from 'polished';

interface Props {
    background: string;
}

export const Container = styled.div<Props>`
	cursor: pointer;
	height: 50px;
	width: 50px;
	border-radius: 5px;
	background: ${props => props.background};
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.2s;

	&:hover {
		background: ${props => shade(0.2, props.background)};
	}
`;
