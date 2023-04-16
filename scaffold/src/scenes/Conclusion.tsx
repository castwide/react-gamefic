import React from 'react';
import { History, Turn, SceneProps } from 'react-gamefic';

export default function Conclusion({output, history, handleInput}: SceneProps) {
	return (
		<div>
			<History turns={history} />
			<Turn output={output} />
		</div>
	);
}
