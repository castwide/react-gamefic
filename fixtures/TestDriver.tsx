import { Driver } from 'gamefic-driver';

const sharedOutput = {
  scene: {
    type: 'Default',
    name: 'test'
  }
}

export default class TestDriver extends Driver {
  private turn = 0;
	public stop: boolean = false;

	start() {
    this.turn = 0;
		if (!this.stop) {
			this.notify({
				messages: 'introduction',
				...sharedOutput
			});
		}
		return new Promise((resolve) => resolve(true));
	}

	receive(input: string) {
		return new Promise((resolve) => resolve(true));
	}

	update() {
    const output = {
      messages: `turn ${++this.turn}`,
      ...sharedOutput
    }
    this.notify(output);
		return new Promise((resolve) => resolve(true));
	}

	snapshot() {
		return new Promise((resolve) => resolve(true));
	}

	restore(_snapshot: any) {
		return new Promise((resolve) => {
			resolve({
        messages: 'restore',
        ...sharedOutput
      });
		});
	}
}
