export { closePopup, handleKey, closeOverlay };

const handleKey = (evt) => {
  if (evt.key === 'Escape') {
    const popupCloseTotal = document.querySelector('.popup_opened');
    closePopup(popupCloseTotal);
    console.log('handlekey');
  };
}

const closeOverlay = (evt) => {
  const popupCloseTotal = document.querySelector('.popup_opened');
  if (evt.target === popupCloseTotal) {
    closePopup(popupCloseTotal);
  }
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKey);
  document.removeEventListener('mousedown', closeOverlay);
}
