import {
	RESIZE
} from './ActionTypes.jsx';

export function resize( screenWidth, screenHeight ) {
	return {
		type : RESIZE, 		// 필수로 들어가는 부분, 어떤 액션인지 구분
		screenWidth : screenWidth,
		screenHeight : screenHeight
	}
}