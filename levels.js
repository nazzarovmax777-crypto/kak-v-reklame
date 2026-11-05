// Данные уровней и миров игры «Как в рекламе».
// Уровень: участок (w×h), старт героя, сущности на старте (ents) и площадки покупки (pads).
// Площадка: cost, позиция, подпись, req — какая площадка должна быть куплена раньше,
// builds — что появится, effect — улучшение (cap — рюкзак, speed — сапоги), goal — финальное здание.
window.KVR_LEVELS = (() => {
  const O = [[0, 0], [1.7, .5], [-1.6, .8], [.4, -1.6], [-1.3, -1.4], [2, -1.2], [-2.2, -.4], [.3, 1.7]];
  const gr = (t, cx, cz, n) => O.slice(0, n).map(([dx, dz]) => ({ t, x: cx + dx, z: cz + dz }));
  const fire = r => ({ t: 'fire', r });
  const worker = (kind, to) => ({ t: 'helper', kind, to });
  const carrier = (from, to) => ({ t: 'helper', from, to });
  const big = () => [...gr('tree', -9, -7, 5), { id: 'saw', t: 'saw', x: -4, z: -7.5 }, { id: 'm', t: 'market', x: 2, z: -8.5 },
    ...gr('rock', 9, -7, 5), ...gr('hole', -9, 3, 5)];
  // Время на звезду «за скорость» по уровням, секунды: время бота ×1.5 (живой игрок медленнее идеального)
  const PAR = [150, 150, 150, 165, 180, 150, 195, 195, 180, 180, 270, 270, 270, 285, 270, 255, 300, 285, 345, 360, 285, 270, 300, 285, 285, 270, 375, 360, 300, 360, 390, 390, 375, 450, 405, 420, 405, 495, 450, 480];
  return [
    { name: 'Первая вырубка', goal: 'Склад', w: 20, h: 18, start: [0, 3], color: 0x6aa5d8,
      hint: 'Подойди к ёлкам — брёвна соберутся сами. Отнеси их в лавку и забери деньги.',
      ents: [...gr('tree', -6, -4, 5), { id: 'm', t: 'market', x: 5, z: -5 }],
      pads: [
        { id: 'a', cost: 12, x: -3, z: 2.5, label: 'РОЩА', builds: gr('tree', -6.5, 5, 3) },
        { id: 'b', cost: 20, x: 1, z: 6, label: 'РЮКЗАК +4', effect: 'cap' },
        { id: 'g', cost: 210, x: 5.5, z: 4.5, label: 'СКЛАД', goal: true, req: 'a' },
      ] },
    { name: 'Пилорама', goal: 'Лесной двор', w: 22, h: 20, start: [0, 4], color: 0xe0a24a,
      hint: 'Пилорама делает из брёвен доски. Доски стоят втрое дороже.',
      ents: [...gr('tree', -7, -5, 6), { id: 'm', t: 'market', x: 6.5, z: -5.5 }],
      pads: [
        { id: 's', cost: 15, x: -1, z: -5, label: 'ПИЛОРАМА', builds: [{ id: 'saw', t: 'saw' }] },
        { id: 'c', cost: 25, x: 2, z: 6, label: 'РЮКЗАК +4', effect: 'cap' },
        { id: 'h', cost: 45, x: -1, z: 2, label: 'ЛЕСОРУБ', req: 's', builds: [worker('tree', 'saw')] },
        { id: 'a', cost: 35, x: -7.5, z: 1.5, label: 'РОЩА', builds: gr('tree', -7.5, 1.5, 4) },
        { id: 'g', cost: 400, x: 5.5, z: 4.5, label: 'ЛЕСНОЙ ДВОР', goal: true, req: 's' },
      ] },
    { name: 'Волчья ночь', goal: 'Сторожка', w: 22, h: 20, start: [0, 3], color: 0x7e8fa6,
      hint: 'Скоро придут волки — скорее строй костёр! У костра бери факел и подходи к волку вплотную, чтобы прогнать.',
      wolves: { first: 25, every: 14, max: 2, speed: 4.3 },
      ents: [...gr('tree', -7, -5, 6), { id: 'saw', t: 'saw', x: -1, z: -5 }, { id: 'm', t: 'market', x: 6.5, z: -5.5 }],
      pads: [
        { id: 'f', cost: 20, x: 0, z: 2, label: 'КОСТЁР', builds: [fire(3.6)] },
        { id: 'h', cost: 40, x: -5, z: 4, label: 'ЛЕСОРУБ', builds: [worker('tree', 'saw')] },
        { id: 'k', cost: 50, x: 3.5, z: 1, label: 'ГРУЗЧИК', req: 'h', builds: [carrier('saw', 'm')] },
        { id: 'c', cost: 30, x: -8, z: 6, label: 'РЮКЗАК +4', effect: 'cap' },
        { id: 'g', cost: 480, x: 6, z: 5.5, label: 'СТОРОЖКА', goal: true, req: 'f' },
      ] },
    { name: 'Каменоломня', goal: 'Каменный дом', w: 22, h: 20, start: [0, 3], color: 0xb9a48e,
      hint: 'Камень обжигают в печи — выходит кирпич.',
      wolves: { first: 30, every: 14, max: 2, speed: 4.4 },
      ents: [...gr('rock', 6.5, -5.5, 5), { id: 'm', t: 'market', x: -6.5, z: -5.5 }],
      pads: [
        { id: 'kp', cost: 20, x: .5, z: -5, label: 'ПЕЧЬ', builds: [{ id: 'kiln', t: 'kiln' }] },
        { id: 'f', cost: 25, x: 0, z: 2.5, label: 'КОСТЁР', builds: [fire(3.6)] },
        { id: 'h', cost: 45, x: 5, z: 2, label: 'КАМЕНЩИК', req: 'kp', builds: [worker('rock', 'kiln')] },
        { id: 'c', cost: 30, x: -4.5, z: 3, label: 'РЮКЗАК +4', effect: 'cap' },
        { id: 'sp', cost: 40, x: -8, z: 6, label: 'САПОГИ', effect: 'speed' },
        { id: 'g', cost: 530, x: 5.5, z: 6.5, label: 'КАМЕННЫЙ ДОМ', goal: true, req: 'kp' },
      ] },
    { name: 'Два ремесла', goal: 'Мастерская', w: 24, h: 22, start: [0, 4], color: 0x5fae8a,
      hint: 'Два сырья — два цеха. Найми помощников, чтобы успевать.',
      wolves: { first: 30, every: 13, max: 2, speed: 4.5 },
      ents: [...gr('tree', -8, -6, 5), { id: 'saw', t: 'saw', x: -3, z: -6.5 }, { id: 'm', t: 'market', x: 2.5, z: -7 }, ...gr('rock', 8, -6, 5)],
      pads: [
        { id: 'kp', cost: 30, x: 6, z: -1, label: 'ПЕЧЬ', builds: [{ id: 'kiln', t: 'kiln' }] },
        { id: 'f', cost: 30, x: 0, z: 2, label: 'КОСТЁР', builds: [fire(3.8)] },
        { id: 'h1', cost: 40, x: -6, z: 3, label: 'ЛЕСОРУБ', builds: [worker('tree', 'saw')] },
        { id: 'h2', cost: 50, x: 9, z: 4, label: 'КАМЕНЩИК', req: 'kp', builds: [worker('rock', 'kiln')] },
        { id: 'c', cost: 35, x: -3, z: 7, label: 'РЮКЗАК +4', effect: 'cap' },
        { id: 'g', cost: 600, x: 5, z: 7, label: 'МАСТЕРСКАЯ', goal: true, req: 'kp' },
      ] },
    { name: 'Подлёдный лов', goal: 'Рыбный рынок', w: 22, h: 20, start: [0, 3], color: 0x4f9fc4,
      hint: 'Рыбу ловят в лунках. Коптильня делает из неё консервы.',
      wolves: { first: 25, every: 12, max: 2, speed: 4.5 },
      ents: [...gr('hole', -6.5, -5, 5), { id: 'm', t: 'market', x: 6.5, z: -5.5 }],
      pads: [
        { id: 'gp', cost: 20, x: -.5, z: -5, label: 'КОПТИЛЬНЯ', builds: [{ id: 'grill', t: 'grill' }] },
        { id: 'f', cost: 25, x: 0, z: 2.5, label: 'КОСТЁР', builds: [fire(3.6)] },
        { id: 'h', cost: 45, x: -6, z: 3, label: 'РЫБАК', req: 'gp', builds: [worker('hole', 'grill')] },
        { id: 'k', cost: 50, x: 4, z: 2, label: 'ГРУЗЧИК', req: 'gp', builds: [carrier('grill', 'm')] },
        { id: 'c', cost: 30, x: -8.5, z: 7, label: 'РЮКЗАК +4', effect: 'cap' },
        { id: 'g', cost: 760, x: 6, z: 6, label: 'РЫБНЫЙ РЫНОК', goal: true, req: 'gp' },
      ] },
    { name: 'Стая', goal: 'Охотничий дом', w: 24, h: 22, start: [0, 4], color: 0x9b6b4a,
      hint: 'Волков стало больше, и они быстрее. Держись ближе к кострам.',
      wolves: { first: 25, every: 10, max: 4, speed: 4.8 },
      ents: [...gr('tree', -8, -6, 5), { id: 'saw', t: 'saw', x: -3, z: -6.5 }, { id: 'm', t: 'market', x: 2.5, z: -7 }, ...gr('hole', 8, -6, 5)],
      pads: [
        { id: 'gp', cost: 30, x: 6, z: -1, label: 'КОПТИЛЬНЯ', builds: [{ id: 'grill', t: 'grill' }] },
        { id: 'f1', cost: 25, x: -1, z: 1.5, label: 'КОСТЁР', builds: [fire(3.4)] },
        { id: 'f2', cost: 40, x: 7, z: 5, label: 'КОСТЁР', req: 'gp', builds: [fire(3.4)] },
        { id: 'h1', cost: 40, x: -7, z: 3, label: 'ЛЕСОРУБ', builds: [worker('tree', 'saw')] },
        { id: 'h2', cost: 50, x: 10, z: 1.5, label: 'РЫБАК', req: 'gp', builds: [worker('hole', 'grill')] },
        { id: 'k1', cost: 50, x: 1.5, z: -2, label: 'ГРУЗЧИК', req: 'h1', builds: [carrier('saw', 'm')] },
        { id: 'sp', cost: 40, x: -9, z: 8, label: 'САПОГИ', effect: 'speed' },
        { id: 'c', cost: 35, x: -4, z: 7, label: 'РЮКЗАК +4', effect: 'cap' },
        { id: 'g', cost: 860, x: 3, z: 7.5, label: 'ОХОТНИЧИЙ ДОМ', goal: true, req: 'gp' },
      ] },
    { name: 'Три цеха', goal: 'Фактория', w: 26, h: 24, start: [0, 5], color: 0xc2584a,
      hint: 'Лес, камень и рыба сразу. Построй недостающие цеха.',
      wolves: { first: 30, every: 12, max: 3, speed: 4.8 },
      ents: big(),
      pads: [
        { id: 'kp', cost: 30, x: 6, z: -2, label: 'ПЕЧЬ', builds: [{ id: 'kiln', t: 'kiln' }] },
        { id: 'gp', cost: 40, x: -4, z: 1, label: 'КОПТИЛЬНЯ', builds: [{ id: 'grill', t: 'grill' }] },
        { id: 'f', cost: 30, x: 1, z: 3, label: 'КОСТЁР', builds: [fire(3.6)] },
        { id: 'h1', cost: 40, x: -6, z: -2.5, label: 'ЛЕСОРУБ', builds: [worker('tree', 'saw')] },
        { id: 'h2', cost: 50, x: 10, z: -1.5, label: 'КАМЕНЩИК', req: 'kp', builds: [worker('rock', 'kiln')] },
        { id: 'k1', cost: 50, x: 3, z: .5, label: 'ГРУЗЧИК', req: 'h1', builds: [carrier('saw', 'm')] },
        { id: 'k2', cost: 60, x: 10, z: 3, label: 'ГРУЗЧИК', req: 'h2', builds: [carrier('kiln', 'm')] },
        { id: 'h3', cost: 50, x: -9, z: 8, label: 'РЫБАК', req: 'gp', builds: [worker('hole', 'grill')] },
        { id: 'c', cost: 40, x: -3, z: 8, label: 'РЮКЗАК +4', effect: 'cap' },
        { id: 'g', cost: 950, x: 7, z: 8, label: 'ФАКТОРИЯ', goal: true, req: 'kp' },
      ] },
    { name: 'Большая стройка', goal: 'Ратуша', w: 26, h: 24, start: [0, 5], color: 0x3f6fb0,
      hint: 'Грузчики сами носят готовое в лавку. Тебе — собирать деньги.',
      wolves: { first: 30, every: 10, max: 4, speed: 5 },
      ents: [...big(), { id: 'kiln', t: 'kiln', x: 6, z: -2 }],
      pads: [
        { id: 'gp', cost: 30, x: -4, z: 1, label: 'КОПТИЛЬНЯ', builds: [{ id: 'grill', t: 'grill' }] },
        { id: 'f', cost: 30, x: 1, z: 3, label: 'КОСТЁР', builds: [fire(3.6)] },
        { id: 'h1', cost: 40, x: -6, z: -2.5, label: 'ЛЕСОРУБ', builds: [worker('tree', 'saw')] },
        { id: 'h2', cost: 45, x: 10, z: -1.5, label: 'КАМЕНЩИК', builds: [worker('rock', 'kiln')] },
        { id: 'k1', cost: 50, x: 3, z: .5, label: 'ГРУЗЧИК', req: 'h1', builds: [carrier('saw', 'm')] },
        { id: 'k2', cost: 60, x: 10, z: 3, label: 'ГРУЗЧИК', req: 'h2', builds: [carrier('kiln', 'm')] },
        { id: 'h3', cost: 50, x: -9, z: 8, label: 'РЫБАК', req: 'gp', builds: [worker('hole', 'grill')] },
        { id: 'sp', cost: 40, x: -6.5, z: 10.5, label: 'САПОГИ', effect: 'speed' },
        { id: 'c', cost: 40, x: -3, z: 8, label: 'РЮКЗАК +4', effect: 'cap' },
        { id: 'g', cost: 1100, x: 7, z: 8, label: 'РАТУША', goal: true, req: 'f' },
      ] },
    { name: 'Маяк', goal: 'Маяк', w: 26, h: 24, start: [0, 5], color: 0xf0f0f0,
      hint: 'Босс-уровень: на 40-й секунде придёт вожак стаи. Маяк можно строить, только когда прогонишь его факелом трижды.',
      wolves: { first: 25, every: 8, max: 5, speed: 5.2, boss: { at: 40, hp: 3 } },
      ents: [...big(), { id: 'kiln', t: 'kiln', x: 6, z: -2 }, { id: 'grill', t: 'grill', x: -4, z: 1 }],
      pads: [
        { id: 'f1', cost: 30, x: 1, z: 3, label: 'КОСТЁР', builds: [fire(3.6)] },
        { id: 'f2', cost: 50, x: -1, z: 9, label: 'КОСТЁР', req: 'f1', builds: [fire(3.2)] },
        { id: 'h1', cost: 40, x: -6, z: -2.5, label: 'ЛЕСОРУБ', builds: [worker('tree', 'saw')] },
        { id: 'h2', cost: 45, x: 10, z: -1.5, label: 'КАМЕНЩИК', builds: [worker('rock', 'kiln')] },
        { id: 'h3', cost: 45, x: -9, z: 8, label: 'РЫБАК', builds: [worker('hole', 'grill')] },
        { id: 'k1', cost: 50, x: 3, z: .5, label: 'ГРУЗЧИК', req: 'h1', builds: [carrier('saw', 'm')] },
        { id: 'k2', cost: 60, x: 10, z: 3, label: 'ГРУЗЧИК', req: 'h2', builds: [carrier('kiln', 'm')] },
        { id: 'k3', cost: 60, x: -1, z: -2.5, label: 'ГРУЗЧИК', req: 'h3', builds: [carrier('grill', 'm')] },
        { id: 'c', cost: 40, x: -4, z: 9, label: 'РЮКЗАК +4', effect: 'cap' },
        { id: 'sp', cost: 40, x: -6.5, z: 10.5, label: 'САПОГИ', effect: 'speed' },
        { id: 'g', cost: 1320, x: 7, z: 8, label: 'МАЯК', goal: true, req: 'f1' },
      ] },
    // ---------- Мир 2: Озёрный край ----------
    ...(() => {
      const reedsAt = pts => pts.map(([x, z]) => ({ t: 'reed', x, z }));
      // Шаблон «пруд»: лес слева, пилорама и лавка у дальнего края, пруд с тростником справа
      const pond = { x: 8.5, z: -8.5, w: 6, h: 4 };
      const pondBase = () => [...gr('tree', -8, -6, 5), { id: 'saw', t: 'saw', x: -3, z: -6.5 }, { id: 'm', t: 'market', x: 2.5, z: -7 }];
      // Шаблон «река»: река слева, на том берегу лес, мост покупается
      const river = [{ x: -5.5, z: -6, w: 2, h: 10 }, { id: 'gap', x: -5.5, z: 0, w: 2, h: 2 }, { x: -5.5, z: 6, w: 2, h: 10 }];
      const island = () => [...gr('tree', -9.3, -6, 5).map(t => ({ ...t, zone: 'island' })), ...gr('tree', -9.3, 5, 4).map(t => ({ ...t, zone: 'island' }))];
      const bridge = (x, z, cost) => ({ id: 'br', cost, x, z, label: 'МОСТ', builds: [{ t: 'bridge', gap: 'gap', zone: 'island', x: -5.5, z: 0 }] });
      // Большой шаблон: река, остров, пруд с причалом
      const bigRiver = [{ x: -7.5, z: -6.5, w: 2, h: 11 }, { id: 'gap', x: -7.5, z: 0, w: 2, h: 2 }, { x: -7.5, z: 6.5, w: 2, h: 11 }];
      const bigBase = () => [
        ...gr('tree', -11, -6, 5).map(t => ({ ...t, zone: 'island' })), ...gr('tree', -11, 5, 4).map(t => ({ ...t, zone: 'island' })),
        { id: 'saw', t: 'saw', x: -3, z: -4.5 }, { id: 'm', t: 'market', x: 3.5, z: -9 }, { id: 'd1', t: 'dock', x: 10, z: -6.6 }, { id: 'weave', t: 'weave', x: 2, z: -2 },
        ...reedsAt([[-5.6, -9], [-5.5, -5], [-5.7, 5], [-5.5, 8.5], [-5.6, 10]]),
      ];
      const bigWater = [...bigRiver, { x: 10, z: -9.6, w: 7, h: 4 }];
      const bigPads = () => [
        { id: 'br', cost: 40, x: -4.8, z: 0, label: 'МОСТ', builds: [{ t: 'bridge', gap: 'gap', zone: 'island', x: -7.5, z: 0 }] },
        { id: 'gp', cost: 45, x: 9, z: -1.5, label: 'КОПТИЛЬНЯ', builds: [{ id: 'grill', t: 'grill' }] },
        { id: 'f', cost: 30, x: -2, z: 3, label: 'КОСТЁР', builds: [fire(3.6)] },
        { id: 'f2', cost: 40, x: 11, z: 5.5, label: 'КОСТЁР', req: 'f', builds: [fire(3.4)] },
        { id: 'h1', cost: 50, x: -3, z: 6.5, label: 'ЛЕСОРУБ', req: 'br', builds: [worker('tree', 'saw')] },
        { id: 'h2', cost: 50, x: 6, z: 4, label: 'ТРОСТНИЧНИК', builds: [worker('reed', 'weave')] },
        { id: 'k1', cost: 60, x: 12, z: 2, label: 'ГРУЗЧИК', req: 'gp', builds: [carrier('d1', 'grill')] },
        { id: 'k2', cost: 60, x: 2.5, z: 3.5, label: 'ГРУЗЧИК', req: 'h1', builds: [carrier('saw', 'm')] },
        { id: 'c', cost: 45, x: -1, z: 9.5, label: 'РЮКЗАК +4', effect: 'cap' },
      ];
      return [
        { name: 'Берег', goal: 'Хутор', w: 24, h: 22, start: [0, 5], color: 0x7fb36a, water: [pond],
          hint: 'Новое сырьё — тростник у воды. Плетельня делает из него корзины. И пилораму теперь можно улучшить.',
          wolves: { first: 30, every: 14, max: 2, speed: 4.5 },
          ents: [...pondBase(), ...reedsAt([[6, -5.6], [7.5, -5.4], [9, -5.7], [10.5, -5.5], [11, -4.4]])],
          pads: [
            { id: 'wp', cost: 25, x: 6, z: -1, label: 'ПЛЕТЕЛЬНЯ', builds: [{ id: 'weave', t: 'weave' }] },
            { id: 'f', cost: 25, x: 0, z: 2, label: 'КОСТЁР', builds: [fire(3.6)] },
            { id: 'h1', cost: 40, x: -6, z: 3, label: 'ЛЕСОРУБ', builds: [worker('tree', 'saw')] },
            { id: 'h2', cost: 45, x: 9, z: 4, label: 'ТРОСТНИЧНИК', req: 'wp', builds: [worker('reed', 'weave')] },
            { id: 'c', cost: 35, x: -3, z: 7, label: 'РЮКЗАК +4', effect: 'cap' },
            { id: 'g', cost: 1400, x: 5, z: 7, label: 'ХУТОР', goal: true, req: 'wp' },
          ] },
        { name: 'Мостки', goal: 'Рыбацкие хижины', w: 24, h: 22, start: [2, 5], color: 0x8b6b4a, water: river,
          hint: 'Лес — на том берегу. Построй мост, чтобы туда ходить.',
          wolves: { first: 30, every: 14, max: 2, speed: 4.5 },
          ents: [...island(), { id: 'saw', t: 'saw', x: 1, z: -7 }, { id: 'm', t: 'market', x: 7, z: -7 }, { id: 'weave', t: 'weave', x: 7, z: -1 },
            ...reedsAt([[-3.7, -8], [-3.6, -6.2], [-3.8, 4.5], [-3.6, 6.5], [-3.7, 8.5]])],
          pads: [
            bridge(-2.6, 0, 30),
            { id: 'f', cost: 25, x: 2, z: 2.5, label: 'КОСТЁР', builds: [fire(3.6)] },
            { id: 'h1', cost: 45, x: -1.5, z: 5, label: 'ЛЕСОРУБ', req: 'br', builds: [worker('tree', 'saw')] },
            { id: 'h2', cost: 45, x: 10, z: 3, label: 'ТРОСТНИЧНИК', builds: [worker('reed', 'weave')] },
            { id: 'c', cost: 35, x: 3, z: 8, label: 'РЮКЗАК +4', effect: 'cap' },
            { id: 'g', cost: 950, x: 8, z: 7.5, label: 'ХИЖИНЫ', goal: true, req: 'br' },
          ] },
        { name: 'Причал', goal: 'Навес лодочника', w: 24, h: 22, start: [0, 5], color: 0x6c8fb0, water: [pond],
          hint: 'Лодка у причала ловит рыбу сама. Забирай улов с лотка или найми грузчика.',
          wolves: { first: 30, every: 13, max: 2, speed: 4.6 },
          ents: [...pondBase(), { id: 'd1', t: 'dock', x: 8.5, z: -5.6 }, ...reedsAt([[5.6, -5.4], [11, -5]])],
          pads: [
            { id: 'gp', cost: 30, x: 6, z: -1, label: 'КОПТИЛЬНЯ', builds: [{ id: 'grill', t: 'grill' }] },
            { id: 'f', cost: 25, x: 0, z: 2, label: 'КОСТЁР', builds: [fire(3.6)] },
            { id: 'h1', cost: 40, x: -6, z: 3, label: 'ЛЕСОРУБ', builds: [worker('tree', 'saw')] },
            { id: 'k1', cost: 50, x: 9.5, z: 3, label: 'ГРУЗЧИК', req: 'gp', builds: [carrier('d1', 'grill')] },
            { id: 'c', cost: 35, x: -3, z: 7, label: 'РЮКЗАК +4', effect: 'cap' },
            { id: 'g', cost: 1350, x: 4, z: 7.5, label: 'НАВЕС', goal: true, req: 'gp' },
          ] },
        { name: 'Хозяин леса', goal: 'Амбар', w: 24, h: 22, start: [0, 5], color: 0x9a3b2e, water: [pond],
          hint: 'В лесу живёт лось. Он медленнее волка, но бодается на 2 сердца. Факел пугает и его.',
          wolves: { first: 35, every: 15, max: 2, speed: 4.6 }, moose: { first: 40, every: 35, max: 1, speed: 3.7, dmg: 2, aggro: 5 },
          ents: [...pondBase(), { id: 'weave', t: 'weave', x: 6, z: -1 }, ...reedsAt([[6, -5.6], [7.5, -5.4], [9, -5.7], [10.5, -5.5], [11, -4.4]])],
          pads: [
            { id: 'f', cost: 25, x: 0, z: 2, label: 'КОСТЁР', builds: [fire(3.6)] },
            { id: 'h1', cost: 40, x: -6, z: 3, label: 'ЛЕСОРУБ', builds: [worker('tree', 'saw')] },
            { id: 'h2', cost: 45, x: 9, z: 4, label: 'ТРОСТНИЧНИК', builds: [worker('reed', 'weave')] },
            { id: 'k1', cost: 55, x: 3, z: .5, label: 'ГРУЗЧИК', req: 'h2', builds: [carrier('weave', 'm')] },
            { id: 'c', cost: 35, x: -3, z: 7, label: 'РЮКЗАК +4', effect: 'cap' },
            { id: 'g', cost: 1800, x: 5, z: 7.5, label: 'АМБАР', goal: true, req: 'f' },
          ] },
        { name: 'Помощники', goal: 'Сторожевая вышка', w: 24, h: 22, start: [0, 5], color: 0xc2584a, water: [pond],
          hint: 'Новая площадка «УЛУЧШИТЬ РАБОТНИКОВ»: все работники сразу станут быстрее и будут носить больше.',
          wolves: { first: 30, every: 13, max: 2, speed: 4.7 }, moose: { first: 50, every: 40, max: 1, speed: 3.7, dmg: 2, aggro: 5 },
          ents: [...pondBase(), { id: 'd1', t: 'dock', x: 8.5, z: -5.6 }, ...reedsAt([[5.6, -5.4], [11, -5]])],
          pads: [
            { id: 'gp', cost: 30, x: 6, z: -1, label: 'КОПТИЛЬНЯ', builds: [{ id: 'grill', t: 'grill' }] },
            { id: 'f', cost: 25, x: 0, z: 2, label: 'КОСТЁР', builds: [fire(3.6)] },
            { id: 'h1', cost: 40, x: -6, z: 3, label: 'ЛЕСОРУБ', builds: [worker('tree', 'saw')] },
            { id: 'k1', cost: 50, x: 9.5, z: 3, label: 'ГРУЗЧИК', req: 'gp', builds: [carrier('d1', 'grill')] },
            { id: 'k2', cost: 55, x: 3, z: .5, label: 'ГРУЗЧИК', req: 'h1', builds: [carrier('saw', 'm')] },
            { id: 'c', cost: 35, x: -3, z: 7, label: 'РЮКЗАК +4', effect: 'cap' },
            { id: 'g', cost: 1350, x: 4, z: 7.5, label: 'ВЫШКА', goal: true, req: 'gp' },
          ] },
        { name: 'Два берега', goal: 'Мельница', w: 24, h: 22, start: [2, 5], color: 0xe0a24a, water: river,
          hint: 'Звери приходят с обоих берегов. Мост открывает лес, но и путь к тебе.',
          wolves: { first: 30, every: 13, max: 2, speed: 4.7 }, moose: { first: 55, every: 35, max: 1, speed: 3.8, dmg: 2, aggro: 5 },
          ents: [...island(), { id: 'saw', t: 'saw', x: 1, z: -7 }, { id: 'm', t: 'market', x: 7, z: -7 }, { id: 'weave', t: 'weave', x: 7, z: -1 },
            ...reedsAt([[-3.7, -8], [-3.6, -6.2], [-3.8, 4.5], [-3.6, 6.5], [-3.7, 8.5]])],
          pads: [
            bridge(-2.6, 0, 35),
            { id: 'f', cost: 25, x: 2, z: 2.5, label: 'КОСТЁР', builds: [fire(3.6)] },
            { id: 'h1', cost: 45, x: -1.5, z: 5, label: 'ЛЕСОРУБ', req: 'br', builds: [worker('tree', 'saw')] },
            { id: 'h2', cost: 45, x: 10, z: 3, label: 'ТРОСТНИЧНИК', builds: [worker('reed', 'weave')] },
            { id: 'k1', cost: 55, x: 4.5, z: -3.5, label: 'ГРУЗЧИК', req: 'h2', builds: [carrier('weave', 'm')] },
            { id: 'c', cost: 35, x: 3, z: 8, label: 'РЮКЗАК +4', effect: 'cap' },
            { id: 'g', cost: 800, x: 8, z: 7.5, label: 'МЕЛЬНИЦА', goal: true, req: 'br' },
          ] },
        { name: 'Ночной клёв', goal: 'Большой амбар', w: 28, h: 24, start: [2, 6], color: 0x9a3b2e, water: bigWater,
          hint: 'Большое озеро: река, остров и причал. Волков больше, и лось где-то рядом.',
          wolves: { first: 30, every: 13, max: 2, speed: 4.8 }, moose: { first: 70, every: 40, max: 1, speed: 3.8, dmg: 2, aggro: 5 },
          ents: bigBase(),
          pads: [...bigPads(), { id: 'g', cost: 900, x: 8, z: 8, label: 'БОЛЬШОЙ АМБАР', goal: true, req: 'gp' }] },
        { name: 'Парусник', goal: 'Башня', w: 24, h: 22, start: [0, 5], color: 0x5f6f86, water: [pond],
          hint: 'Поставь на лодку парус — улов станет почти вдвое больше.',
          wolves: { first: 30, every: 12, max: 2, speed: 4.8 }, moose: { first: 45, every: 35, max: 1, speed: 3.8, dmg: 2, aggro: 5 },
          ents: [...pondBase(), { id: 'd1', t: 'dock', x: 8.5, z: -5.6 }, ...reedsAt([[5.6, -5.4]])],
          pads: [
            { id: 'gp', cost: 30, x: 6, z: -1, label: 'КОПТИЛЬНЯ', builds: [{ id: 'grill', t: 'grill' }] },
            { id: 'sl', cost: 120, x: 10.5, z: -2.8, label: 'ПАРУС', effect: 'sail', dock: 'd1' },
            { id: 'f', cost: 25, x: 0, z: 2, label: 'КОСТЁР', builds: [fire(3.6)] },
            { id: 'h1', cost: 40, x: -6, z: 3, label: 'ЛЕСОРУБ', builds: [worker('tree', 'saw')] },
            { id: 'k1', cost: 50, x: 9.5, z: 3, label: 'ГРУЗЧИК', req: 'gp', builds: [carrier('d1', 'grill')] },
            { id: 'k2', cost: 55, x: 3, z: .5, label: 'ГРУЗЧИК', req: 'h1', builds: [carrier('saw', 'm')] },
            { id: 'c', cost: 35, x: -3, z: 7, label: 'РЮКЗАК +4', effect: 'cap' },
            { id: 'g', cost: 1600, x: 4, z: 7.5, label: 'БАШНЯ', goal: true, req: 'gp' },
          ] },
        { name: 'Большая вода', goal: 'Городской дом', w: 28, h: 24, start: [2, 6], color: 0xc9ced6, water: bigWater,
          hint: 'Всё озеро сразу. Парус, грузчики, улучшенные работники — без них не успеть.',
          wolves: { first: 30, every: 12, max: 2, speed: 4.9 }, moose: { first: 60, every: 35, max: 1, speed: 3.9, dmg: 2, aggro: 5 },
          ents: bigBase(),
          pads: [...bigPads(), { id: 'sl', cost: 140, x: 12.5, z: -3.8, label: 'ПАРУС', effect: 'sail', dock: 'd1' },
            { id: 'g', cost: 950, x: 8, z: 8, label: 'ГОРОДСКОЙ ДОМ', goal: true, req: 'gp' }] },
        { name: 'Шатун', goal: 'Порт', w: 28, h: 24, start: [2, 6], color: 0x6c8fb0, water: bigWater,
          hint: 'Босс-уровень: на 60-й секунде выйдет Шатун — огромный лось. Порт можно строить, когда прогонишь его факелом 4 раза.',
          wolves: { first: 30, every: 13, max: 2, speed: 4.9, boss: { at: 60, hp: 4, kind: 'moose', name: 'ШАТУН' } },
          moose: { first: 70, every: 40, max: 1, speed: 3.9, dmg: 2, aggro: 5 },
          ents: bigBase(),
          pads: [...bigPads(), { id: 'sl', cost: 140, x: 12.5, z: -3.8, label: 'ПАРУС', effect: 'sail', dock: 'd1' },
            { id: 'g', cost: 1200, x: 8, z: 8, label: 'ПОРТ', goal: true, req: 'gp' }] },
      ];
    })(),
    // ---------- Мир 3: Горы ----------
    ...(() => {
      const base = (o = {}) => [
        { id: 'm', t: 'market', x: -3.5, z: -7.5 }, { id: 'mine1', t: 'mine', x: 9, z: -7.6 },
        ...gr('ore', 8.5, .5, 4),
        ...(o.smelt ? [{ id: 'smelt', t: 'smelt', x: 2.5, z: -6.5 }] : []),
        ...(o.wood ? [...gr('tree', -8.5, -6, 4), { id: 'saw', t: 'saw', x: -7, z: 1.5 }] : []),
      ];
      const pads = (o = {}) => [
        ...(o.smelt ? [] : [{ id: 'sp', cost: 30, x: 2.5, z: -6.5, label: 'ПЛАВИЛЬНЯ', builds: [{ id: 'smelt', t: 'smelt' }] }]),
        ...(o.cart ? [{ id: 'ct', cost: o.cart, x: 5.5, z: -2.5, label: 'ВАГОНЕТКА', req: o.smelt ? undefined : 'sp', builds: [{ t: 'cart', from: 'mine1', to: 'smelt' }] }] : []),
        { id: 'f', cost: 30, x: 0, z: 2, label: 'КОСТЁР', builds: [fire(3.6)] },
        { id: 'h1', cost: 50, x: 9.5, z: 4, label: 'ГОРНЯК', req: o.smelt ? undefined : 'sp', builds: [worker('ore', 'smelt')] },
        { id: 'k1', cost: 60, x: -1, z: -2.5, label: 'ГРУЗЧИК', req: 'h1', builds: [carrier('smelt', 'm')] },
        ...(o.wood ? [{ id: 'h2', cost: 50, x: -9, z: 6, label: 'ЛЕСОРУБ', builds: [worker('tree', 'saw')] }] : []),
        { id: 'c', cost: 45, x: -3, z: 7.5, label: 'РЮКЗАК +4', effect: 'cap' },
        { id: 'bt', cost: 50, x: 1.5, z: 8, label: 'САПОГИ', effect: 'speed' },
      ];
      const L = (name, goal, label, cost, o) => ({ name, goal, w: 24, h: 22, start: [0, 5], color: 0x8a96a3, hint: o.hint,
        wolves: o.wolves, moose: o.yak, storm: o.storm, ents: base(o), pads: [...pads(o), { id: 'g', cost, x: 7, z: 7.5, label, goal: true, req: o.smelt ? 'f' : 'sp' }] });
      const W = (first, every, max, speed, boss) => ({ first, every, max, speed, ...(boss ? { boss } : {}) });
      const yak = (first, every, max) => ({ kind: 'yak', first, every, max, speed: 4.0, dmg: 2, aggro: 5 });
      return [
        L('Перевал', 'Застава', 'ЗАСТАВА', 1650, { hint: 'Горы: руда у скал и шахта, которая добывает сама. Плавильня делает из руды слитки.', wolves: W(30, 14, 2, 4.8) }),
        L('Вагонетки', 'Депо', 'ДЕПО', 1750, { cart: 80, hint: 'Купи вагонетку — она сама повезёт руду из шахты в плавильню.', wolves: W(30, 14, 2, 4.8) }),
        L('Горный лес', 'Горный дом', 'ГОРНЫЙ ДОМ', 1300, { cart: 80, wood: true, hint: 'В горах растёт и лес: пилорама рядом с рудником.', wolves: W(30, 13, 2, 4.9) }),
        L('Буря', 'Приют', 'ПРИЮТ', 1900, { cart: 80, storm: { first: 35, every: 45, dur: 12 }, hint: 'Время от времени налетает буря: всё вокруг медленнее и видно хуже.', wolves: W(30, 13, 2, 4.9) }),
        L('Яки', 'Каменная башня', 'КАМЕННАЯ БАШНЯ', 1800, { cart: 80, yak: yak(45, 35, 1), hint: 'Горный як бодается на 2 сердца. Факел пугает его с первого касания.', wolves: W(30, 14, 2, 4.9) }),
        L('Рудный двор', 'Рудный двор', 'РУДНЫЙ ДВОР', 2100, { smelt: true, cart: 90, storm: { first: 40, every: 45, dur: 12 }, yak: yak(50, 35, 1), hint: 'Плавильня уже стоит. Вагонетка и горняки решают всё.', wolves: W(30, 13, 2, 5) }),
        L('Ледник', 'Колокольня', 'КОЛОКОЛЬНЯ', 1700, { cart: 90, wood: true, storm: { first: 30, every: 30, dur: 14 }, hint: 'Бури здесь часто. Держись ближе к костру.', wolves: W(25, 12, 3, 5) }),
        L('Храм', 'Храм', 'ХРАМ', 1300, { cart: 90, wood: true, yak: yak(45, 35, 1), storm: { first: 40, every: 45, dur: 12 }, hint: 'Руда, лес и звери — всё сразу.', wolves: W(30, 13, 2, 5) }),
        L('Крепость', 'Крепость горцев', 'КРЕПОСТЬ', 2300, { smelt: true, cart: 100, wood: true, yak: yak(40, 30, 2), storm: { first: 40, every: 40, dur: 12 }, hint: 'Два яка и бури. Работники IV получат факелы и перестанут бояться зверей.', wolves: W(30, 12, 2, 5) }),
        L('Белый волк', 'Замок', 'ЗАМОК', 1500, { cart: 100, wood: true, storm: { first: 50, every: 45, dur: 12 }, hint: 'Босс-уровень: на 60-й секунде придёт Белый волк. Замок откроется, когда прогонишь его факелом 4 раза.',
          wolves: W(30, 13, 2, 5, { at: 60, hp: 4, name: 'БЕЛЫЙ ВОЛК', tint: 'white' }) }),
      ];
    })(),

    // ---------- Мир 4: Долина ----------
    ...(() => {
      const field = [[-9.5, -8], [-8, -8], [-6.5, -8], [-9.5, -6.3], [-8, -6.3], [-6.5, -6.3]].map(([x, z]) => ({ t: 'wheat', x, z }));
      const base = (o = {}) => [
        { id: 'm', t: 'market', x: 5, z: -7.5 }, ...field,
        ...(o.mill ? [{ id: 'mill', t: 'mill', x: -1, z: -7 }] : []),
        ...(o.farm ? [{ id: 'f1', t: 'farm', x: 9.5, z: -6.2 }] : []),
      ];
      const pads = (o = {}) => [
        ...(o.mill ? [] : [{ id: 'mp', cost: 30, x: -1, z: -7, label: 'МЕЛЬНИЦА', builds: [{ id: 'mill', t: 'mill' }] }]),
        ...(o.well ? [{ id: 'wl', cost: o.well, x: -5, z: -2.5, label: 'КОЛОДЕЦ', effect: 'water', builds: [{ t: 'decor', model: 'well' }] }] : []),
        { id: 'f', cost: 30, x: 0, z: 2, label: 'КОСТЁР', builds: [fire(3.6)] },
        { id: 'h1', cost: 50, x: -7, z: 2.5, label: 'ЖНЕЦ', req: o.mill ? undefined : 'mp', builds: [worker('wheat', 'mill')] },
        ...(o.farm ? [{ id: 'k2', cost: 60, x: 9.5, z: 2.5, label: 'ДОЯРКА', builds: [carrier('f1', 'm')] }] : []),
        { id: 'k1', cost: 60, x: 2, z: -2.5, label: 'ГРУЗЧИК', req: 'h1', builds: [carrier('mill', 'm')] },
        { id: 'c', cost: 45, x: -3, z: 7.5, label: 'РЮКЗАК +4', effect: 'cap' },
        { id: 'bt', cost: 50, x: 1.5, z: 8, label: 'САПОГИ', effect: 'speed' },
      ];
      const L = (name, goal, label, cost, o) => ({ name, goal, w: 24, h: 22, start: [0, 5], color: 0xc9a14a, hint: o.hint,
        wolves: o.wolves, moose: o.fox, ents: base(o), pads: [...pads(o), { id: 'g', cost, x: 7, z: 7.5, label, goal: true, req: o.mill ? 'f' : 'mp' }] });
      const W = (first, every, max, speed, boss) => ({ first, every, max, speed, ...(boss ? { boss } : {}) });
      const fox = (first, every, max) => ({ kind: 'fox', first, every, max, speed: 5.2, dmg: 0, aggro: 0 });
      return [
        L('Нива', 'Торговые ряды', 'ТОРГОВЫЕ РЯДЫ', 2300, { hint: 'Долина: пшеница растёт на поле, мельница делает муку, а потом хлеб и пироги.', wolves: W(40, 18, 1, 4.7) }),
        L('Колодец', 'Двор с колодцем', 'ДВОР С КОЛОДЦЕМ', 2400, { well: 60, hint: 'Колодец поливает поле — пшеница вырастает вдвое быстрее.', wolves: W(40, 18, 1, 4.7) }),
        L('Ферма', 'Конный памятник', 'КОННЫЙ ПАМЯТНИК', 2500, { well: 60, farm: true, hint: 'Коровы на ферме дают молоко сами. Доярка носит его в лавку.', wolves: W(40, 16, 1, 4.8) }),
        L('Лисы', 'Лисий памятник', 'ЛИСИЙ ПАМЯТНИК', 2650, { well: 60, farm: true, fox: fox(30, 30, 1), hint: 'Лиса не кусает, но ворует с лотков и из лавки. Подбеги — и она удерёт.', wolves: W(45, 18, 1, 4.8) }),
        L('Мастера', 'Большой дом', 'БОЛЬШОЙ ДОМ', 2750, { mill: true, well: 60, farm: true, fox: fox(40, 35, 1), hint: 'Работники III: ещё быстрее, носят по 9 и выдерживают 4 укуса.', wolves: W(40, 16, 2, 4.8) }),
        L('Ярмарка', 'Ярмарка', 'ЯРМАРКА', 2700, { well: 60, farm: true, fox: fox(30, 25, 2), hint: 'Две лисы и волки. Лотки у костра лисы не трогают.', wolves: W(40, 16, 1, 4.9) }),
        L('Пекарня', 'Пекарня', 'ПЕКАРНЯ', 2900, { mill: true, well: 60, farm: true, fox: fox(40, 30, 1), hint: 'Мельница III печёт пироги — самый дорогой товар долины.', wolves: W(40, 15, 2, 4.9) }),
        L('Жатва', 'Башня-мельница', 'БАШНЯ-МЕЛЬНИЦА', 2900, { well: 70, farm: true, fox: fox(30, 25, 2), hint: 'Жаркие дни: звери злее, лисы наглее.', wolves: W(35, 14, 2, 4.9) }),
        L('Большая ярмарка', 'Ратуша', 'РАТУША', 3100, { mill: true, well: 70, farm: true, fox: fox(30, 25, 2), hint: 'Всё сразу: поле, ферма, мельница, лисы и волки.', wolves: W(35, 14, 2, 5) }),
        L('Рыжая', 'Дворец', 'ДВОРЕЦ', 3200, { well: 70, farm: true, fox: fox(45, 30, 1), hint: 'Босс-уровень: на 60-й секунде придёт Рыжая — огромная лиса-воровка. Дворец откроется, когда прогонишь её факелом 4 раза.',
          wolves: W(40, 16, 1, 5, { at: 60, hp: 4, name: 'РЫЖАЯ', kind: 'fox' }) }),
      ];
    })(),
  ].map((L, i) => ({ ...L, par: PAR[i] }));
})();

// Миры по 10 уровней. models — модели, которые нужны только этому миру (грузятся при входе в мир)
window.KVR_WORLDS = [
  { name: 'Тайга', from: 0, models: ['sawmill', 'kiln', 'grill', 'goal1', 'goal2', 'goal3', 'goal4', 'goal5', 'goal6', 'goal7', 'goal8', 'goal9', 'goal10'] },
  { name: 'Озёрный край', from: 10, models: ['sawmill', 'grill', 'weaver', 'moose', 'boat', 'sailboat', 'dock', 'bridge', 'lily', 'reeds', 'item_box', 'goal11', 'goal12', 'goal13', 'goal14', 'goal15', 'goal16', 'goal17', 'goal18', 'goal19', 'goal20'] },
  { name: 'Горы', from: 20, ground: 0xf1f5f8, floor: 0xc3c9cf, models: ['kiln', 'sawmill', 'mine', 'minecart', 'ore_rock', 'yak', 'item_ingot', 'item_tools', 'goal21', 'goal22', 'goal23', 'goal24', 'goal25', 'goal26', 'goal27', 'goal28', 'goal29', 'goal30'] },
  { name: 'Долина', from: 30, ground: 0xbfe39a, floor: 0xd9b27a, models: ['mill', 'well', 'wheat', 'barn_small', 'cow', 'fox', 'item_bread', 'item_flour', 'goal31', 'goal32', 'goal33', 'goal34', 'goal35', 'goal36', 'goal37', 'goal38', 'goal39', 'goal40'] },
  { name: 'Каньон', teaser: 'Песок плавится в стекло, вода на вес золота, а в камнях прячутся скорпионы.' },
  { name: 'Побережье', teaser: 'Корабли ждут заказы, а чайки и пираты тащат всё, что плохо лежит.' },
  { name: 'Болота', teaser: 'Туман, светлячки и зелья из трав. Ночью без фонаря — никуда.' },
  { name: 'Вулкан', teaser: 'Лава перекрывает дороги — строй мосты из обсидиана и успевай.' },
  { name: 'Ледяные пещеры', teaser: 'Скользкий лёд, кристаллы и сам йети в финале.' },
  { name: 'Столица', teaser: 'Все ремёсла сразу и город из десятка районов. Финал игры.' },
];
