import test from 'node:test';
import assert from 'node:assert/strict';
import { detectLocale, LANGUAGE_KEY, REFLECTION_KEY } from '../src/i18n/config.ts';
import { linkId, fragments } from '../src/data/fragments.ts';
import { en } from '../src/i18n/dictionaries/en.ts';
import { zhCN } from '../src/i18n/dictionaries/zh-CN.ts';
import { ja } from '../src/i18n/dictionaries/ja.ts';

test('locale detection and persistent-state keys are stable', () => {
  assert.equal(detectLocale('zh-CN'), 'zh-CN');
  assert.equal(detectLocale('ja-JP'), 'ja');
  assert.equal(detectLocale('de-DE'), 'en');
  assert.notEqual(LANGUAGE_KEY, REFLECTION_KEY);
});

test('a relationship has the same identity in either direction', () => {
  assert.equal(linkId(3, 12), linkId(12, 3));
  assert.notEqual(linkId(3, 12), linkId(3, 13));
});

test('all three languages cover the same twenty authored fragments and principles', () => {
  assert.equal(fragments.length, 20);
  assert.deepEqual(fragments.map(item => item.id), Array.from({ length: 20 }, (_, i) => i));
  for (const dictionary of [en, zhCN, ja]) {
    assert.equal(dictionary.field.fragments.length, fragments.length);
    assert.equal(dictionary.principles.items.length, 5);
    assert.equal(dictionary.field.echoes.length, 8);
    assert.ok(dictionary.concept.statement.length >= 3);
    assert.ok(dictionary.field.fragments.every(Boolean));
  }
});
