export function addToHistory(menu: string) {
    const history = JSON.parse(localStorage.getItem('menuHistory') || '[]');
    history.unshift(menu);
    if (history.length > 10) {
      history.pop();
    }
    localStorage.setItem('menuHistory', JSON.stringify(history));
    return history;
  }