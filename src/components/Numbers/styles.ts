import styled from 'styled-components';

interface Props {
    progress: number;
}

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	

	.title {
		padding-top: 10px;
		padding-bottom: 20px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.description {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			p {
				margin: 0;
			}

			div {
				height: 50px;
				width: 50px;
				border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #000;
			}
		}
	}
`;

export const ProgressBar = styled.div<Props>`
    position: relative;
    border: 2px solid #afcacc;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: #000;

    p {
        z-index: 1;
        margin: 0;
    }

    div {
        position: absolute;
        left: 0;
        height: 100%;
	    display: flex;
	    width: calc(${props => props.progress} * 1%);
		background-color: hsl(calc(${props => props.progress} * 1.2), 80%, 50%);  
    }
`;

export const Container = styled.div`
	width: 100%;
	padding: 5px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 5px;

	&:hover {
	}
`;
