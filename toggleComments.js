document.querySelector('.show-hide').addEventListener('click', function () {
    const commentWrapper = document.getElementById('comment-wrapper');
    const isHidden = commentWrapper.hidden;
    
    // Toggle visibility
    commentWrapper.hidden = !isHidden;
    
    // Update button text and aria-expanded attribute
    this.textContent = isHidden ? 'Hide comments' : 'Show comments';
    this.setAttribute('aria-expanded', isHidden);
  });
  