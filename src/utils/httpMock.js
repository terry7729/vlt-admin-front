import Mock from 'mockjs'
import menuData from '@/libs/menu/'

Mock.mock('/api/menu', 'post', menuData);
