import t from 'libtap';

import * as eventBlocker from '@cfware/event-blocker';

const keys = [
	'preventDefault',
	'stopPropagation',
	'stopImmediatePropagation',
	'blockEvent',
	'immediateBlockEvent'
];

t.same(Object.keys(eventBlocker).sort(), keys.sort());

class EventSnoop {
	calls = {
		preventDefault: 0,
		stopPropagation: 0,
		stopImmediatePropagation: 0
	};

	preventDefault() {
		this.calls.preventDefault++;
	}

	stopPropagation() {
		this.calls.stopPropagation++;
	}

	stopImmediatePropagation() {
		this.calls.stopImmediatePropagation++;
	}
}

for (const method of ['preventDefault', 'stopPropagation', 'stopImmediatePropagation']) {
	const initial = {
		preventDefault: 0,
		stopPropagation: 0,
		stopImmediatePropagation: 0
	};

	t.test(method, async t => {
		t.doesNotThrow(() => eventBlocker[method]());
		t.throws(() => eventBlocker[method]({}));

		const snoop = new EventSnoop();
		t.doesNotThrow(() => eventBlocker[method](snoop));
		t.same(snoop.calls, {
			...initial,
			[method]: 1
		});
	});
}

t.test('blockEvent', async t => {
	t.doesNotThrow(() => eventBlocker.blockEvent());
	t.throws(() => eventBlocker.blockEvent({}));

	const snoop = new EventSnoop();
	t.doesNotThrow(() => eventBlocker.blockEvent(snoop));
	t.same(snoop.calls, {
		preventDefault: 1,
		stopPropagation: 1,
		stopImmediatePropagation: 0
	});
});

t.test('immediateBlockEvent', async t => {
	t.doesNotThrow(() => eventBlocker.immediateBlockEvent());
	t.throws(() => eventBlocker.immediateBlockEvent({}));

	const snoop = new EventSnoop();
	t.doesNotThrow(() => eventBlocker.immediateBlockEvent(snoop));
	t.same(snoop.calls, {
		preventDefault: 1,
		stopPropagation: 1,
		stopImmediatePropagation: 1
	});
});
