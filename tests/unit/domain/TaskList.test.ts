import { describe, expect, it } from 'vitest';
import { Task } from '../../../src/domain/Task';
import { TaskList } from '../../../src/domain/TaskList';

const mkTask = (id: string, title = 'x') => Task.create(id, title);

describe('domain.TaskList', () => {
  it('empty возвращает пустой список', () => {
    expect(TaskList.empty().items).toEqual([]);
  });

  it('add добавляет задачу и сохраняет порядок', () => {
    const list = TaskList.empty().add(mkTask('1', 'a')).add(mkTask('2', 'b'));
    expect(list.items.map((t) => t.id)).toEqual(['1', '2']);
  });

  it('add бросает при дублировании id', () => {
    const list = TaskList.empty().add(mkTask('1'));
    expect(() => list.add(mkTask('1'))).toThrow('duplicate id');
  });

  it('remove удаляет задачу по id', () => {
    const list = TaskList.empty().add(mkTask('1')).add(mkTask('2')).remove('1');
    expect(list.items.map((t) => t.id)).toEqual(['2']);
  });

  it('remove возвращает тот же список, если id не найден', () => {
    const list = TaskList.empty().add(mkTask('1'));
    expect(list.remove('unknown').items.map((t) => t.id)).toEqual(['1']);
  });

  it('toggle переключает статус задачи по id', () => {
    const list = TaskList.empty().add(mkTask('1')).toggle('1');
    expect(list.items[0]!.status).toBe('completed');
  });

  it('toggle возвращает тот же список при неизвестном id', () => {
    const list = TaskList.empty().add(mkTask('1'));
    expect(list.toggle('unknown').items[0]!.status).toBe('active');
  });

  it('filter all возвращает все задачи', () => {
    const list = TaskList.empty().add(mkTask('1')).add(mkTask('2')).toggle('2');
    expect(list.filter('all').map((t) => t.id)).toEqual(['1', '2']);
  });

  it('filter active возвращает только активные', () => {
    const list = TaskList.empty().add(mkTask('1')).add(mkTask('2')).toggle('2');
    expect(list.filter('active').map((t) => t.id)).toEqual(['1']);
  });

  it('filter completed возвращает только завершённые', () => {
    const list = TaskList.empty().add(mkTask('1')).add(mkTask('2')).toggle('2');
    expect(list.filter('completed').map((t) => t.id)).toEqual(['2']);
  });

  it('fromItems восстанавливает список из массива задач', () => {
    const list = TaskList.fromItems([mkTask('1'), mkTask('2')]);
    expect(list.items.map((t) => t.id)).toEqual(['1', '2']);
  });

  it('fromItems бросает при дубликатах id', () => {
    expect(() => TaskList.fromItems([mkTask('1'), mkTask('1')])).toThrow('duplicate id');
  });
});
