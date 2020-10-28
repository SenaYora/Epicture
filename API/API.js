const buildHeader = token => {
  const h = new Headers()
  h.append("Authorization", `Bearer ${token}`)
  return h
}

export function start(token) {
  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  };

  return (
    fetch("https://api.imgur.com/3/gallery/top/viral", requestOptions)
      .then((res) => res.json())
  )
}

export function searchGallery(token, string, sort) {
  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  };

  return (
    fetch("https://api.imgur.com/3/gallery/search/" + sort + "?q=" + string, requestOptions)
      .then((res) => res.json())
  )
}

export function sortGallery(token, section, sort) {
  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  };
  return (
    fetch("https://api.imgur.com/3/gallery/" + section + "/" + sort, requestOptions)
      .then((res) => res.json())
  )
}

export function uploadImage(token, param) {
  const formdata = new FormData()
  formdata.append("image", param.image)
  formdata.append("type", param.type)
  formdata.append("title", param.title)
  formdata.append("description", param.description)

  const requestOptions = {
    method: 'POST',
    headers: buildHeader(token),
    body: formdata,
    redirect: 'follow'
  };

  return fetch("https://api.imgur.com/3/upload", requestOptions)
    .then(res => res.json())
}

export function uploadVideo(token, param) {
  const formdata = new FormData()
  formdata.append("video", param.video)
  formdata.append("type", param.type)
  formdata.append("title", param.title)
  formdata.append("description", param.description)

  const requestOptions = {
    method: 'POST',
    headers: buildHeader(token),
    body: formdata,
    redirect: 'follow'
  }

  return fetch("https://api.imgur.com/3/upload", requestOptions)
    .then(res => res.json())
}

export function addAlbumToFavorite(token, id) {
  const requestOptions = {
    method: 'POST',
    headers: buildHeader(token),
    redirect: 'follow'
  }

  return (
    fetch(`https://api.imgur.com/3/album/${id}/favorite`, requestOptions)
      .then(response => response.json())
  )
}

export function addImageToFavorite(token, id) {
  const requestOptions = {
    method: 'POST',
    headers: buildHeader(token),
    redirect: 'follow'
  }

  return (
    fetch(`https://api.imgur.com/3/image/${id}/favorite`, requestOptions)
      .then(response => response.json())
  )
}

export function getAvatar(token, username) {
  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  };

  return (
    fetch("https://api.imgur.com/3/account/" + username + "/avatar", requestOptions)
      .then((res) => res.json())
  )
}

export function getMyAccountParams(token) {
  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  };
  return (
    fetch(`https://api.imgur.com/3/account/me`, requestOptions)
      .then(response => response.json())
  )
}

export function getComment(token, id) {
  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  }
  return (
    fetch("https://api.imgur.com/3/gallery/" + id + "/comments/best", requestOptions)
      .then(response => response.json())
  )
}

export function getMyImages(token) {
  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  }

  return (
    fetch(`https://api.imgur.com/3/account/me/images`, requestOptions)
      .then(response => response.json())
  )
}

export function getMyImageById(token, id) {
  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  }

  return (
    fetch(`https://api.imgur.com/3/account/me/image/${id}`, requestOptions)
      .then(response => response.json())
  )
}

export function addComment(token, string, id) {
  const formdata = new FormData();
  formdata.append("image_id", id);
  formdata.append("comment", string);

  const requestOptions = {
    method: 'POST',
    headers: buildHeader(token),
    body: formdata,
    redirect: 'follow'
  };

  return (
    fetch("https://api.imgur.com/3/comment", requestOptions)
      .then(response => response.json())
  )
}

export function getFavorites(token) {
  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  }

  return (
    fetch(`https://api.imgur.com/3/account/me/favorites`, requestOptions)
      .then(response => response.json())
  )
}

export function getGalleryAlbumById(token, id) {
  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  }

  return (
    fetch(`https://api.imgur.com/3/gallery/album/${id}`, requestOptions)
      .then(response => response.json())
  )
}

export function getGalleryImageById(token, id) {
  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  }
  return (
    fetch(`https://api.imgur.com/3/gallery/image/${id}`, requestOptions)
      .then(res => res.json())
  )
}

export function changeAccountSetting(token, username, bio, avatar) {
  const formdata = new FormData();
  formdata.append("bio", bio);
  formdata.append("username", username);
  formdata.append("avatar", avatar)

  const requestOptions = {
    method: 'POST',
    headers: buildHeader(token),
    body: formdata,
    redirect: 'follow'
  }

  return (
    fetch(`https://api.imgur.com/3/account/me/settings`, requestOptions)
      .then(response => response.json())
  )
}

export function getAvatarList(token) {

  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  }

  return (
    fetch(`https://api.imgur.com/3/account/me/available_avatars`, requestOptions)
      .then(response => response.json())
  )
}

export function uploadAlbum(token, param) {
  const formdata = new FormData()
  formdata.append("ids[]", param.image)
  formdata.append("title", param.title)
  formdata.append("description", param.description)
  formdata.append("privacy", "public")
  formdata.append("cover", param.image)

  const requestOptions = {
    method: 'POST',
    headers: buildHeader(token),
    body: formdata,
    redirect: 'follow'
  };

  return fetch("https://api.imgur.com/3/album", requestOptions)
    .then(res => res.json())
}

export function shareImage(token, id, title) {
  const formdata = new FormData()
  formdata.append("title", title)
  formdata.append("terms", "1")

  const requestOptions = {
    method: 'POST',
    headers: buildHeader(token),
    body: formdata,
    redirect: 'follow'
  };

  return fetch(`https://api.imgur.com/3/gallery/image/${id}`, requestOptions)
    .then(res => res.json())
}

export function shareAlbum(token, id, title) {
  const formdata = new FormData()
  formdata.append("title", title)
  formdata.append("terms", "1")

  const requestOptions = {
    method: 'POST',
    headers: buildHeader(token),
    body: formdata,
    redirect: 'follow'
  };

  return fetch(`https://api.imgur.com/3/gallery/album/${id}`, requestOptions)
    .then(res => res.json())
}

export function getMyAlbums(token) {
  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  };

  return fetch(`https://api.imgur.com/3/account/me/albums`, requestOptions)
    .then(res => res.json())
}

export function getMyAlbumById(token, id) {
  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  }

  return fetch(`https://api.imgur.com/3/account/me/album/${id}`, requestOptions)
    .then(res => res.json())
}

export function albumVote(token, id, vote) {
  const requestOptions = {
    method: 'POST',
    headers: buildHeader(token),
    redirect: 'follow'
  }
  return (
    fetch(`https://api.imgur.com/3/gallery/${id}/vote/${vote}`, requestOptions)
      .then(response => response.json())
  )
}