import { fourteeners } from '../assets/14er';
import Select from './scripts/select';
document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('.select-container')
    new Select(select)
})