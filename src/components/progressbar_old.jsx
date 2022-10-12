{fileRefName &&
  fileRefName.map((file) => {
    // if (item[0] === previewImage.name) {
    // console.log("ref progress: ", fileRefProgress);
    if (file === previewImage.name) {
      console.log(`item ${file} progress: `, fileRefProgress);
      return (
        <div
          className={`${styles['image-overlay']} ${styles['progressbar']}`}
          // key={item[0]}
        >
          {fileRefProgress <= 100 && (
            <CircularProgressbar
              value={fileRefProgress}
              // text={progress}
              className={styles['progressbar-component']}
            />
          )}
          {fileRefProgress === 100 && (
            <span
              className={`${styles['progress-icon-wrapper']}`}
            >
              <FontAwesomeIcon
                id={`${styles['circle-checked']}`}
                icon={faCircleCheck}
                // color="#ff7d1a"
              />
            </span>
          )}
        </div>
      );
    }
  })}