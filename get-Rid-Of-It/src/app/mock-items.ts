import { Item } from './item.model';
import { RemovalMethod } from './item.model';

export const ITEMS: Item[] = [
    {
    id: '1',
    name: 'Old Lamp',
    reasonForRemoval: 'Not needed anymore',
    photoUrl: 'https://example.com/old_lamp.jpg',
    age: 5,
    comments: 'In good condition',
    dateRemoved: new Date(),
    removalMethod: RemovalMethod.Donated
    },
    {
    id: '2',
    name: 'Broken Chair',
    reasonForRemoval: 'Broken beyond repair',
    photoUrl: 'https://example.com/broken_chair.jpg',
    age: 2,
    comments: 'Only usable as firewood',
    dateRemoved: new Date(),
    removalMethod: RemovalMethod.Trashed
    },
    {
    id: '3',
    name: 'Outdated Phone',
    reasonForRemoval: 'Upgraded to a newer model',
    photoUrl: 'https://example.com/outdated_phone.jpg',
    age: 1,
    comments: 'Still in working condition',
    dateRemoved: new Date(),
    removalMethod: RemovalMethod.Recycled
    },
    {
    id: '4',
    name: 'Vintage Record Player',
    reasonForRemoval: 'Not enough space in apartment',
    photoUrl: 'https://example.com/record_player.jpg',
    age: 10,
    comments: 'In great condition, still plays vinyls',
    dateRemoved: new Date(),
    removalMethod: RemovalMethod.Sold
    },
    {
    id: '5',
    name: 'Unused Exercise Bike',
    reasonForRemoval: "Didn't fit into home gym setup",
    photoUrl: 'https://example.com/exercise_bike.jpg',
    age: 3,
    comments: 'Almost never used, still in good condition',
    dateRemoved: new Date(),
    removalMethod: RemovalMethod.Donated
    },
    ];