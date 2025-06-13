<?php if (isset($_POST['code'])) {
    $code = $_POST['code'];
    $randomkey = rand(9999, 999999);
    $key = $randomkey;
    $cipher = 'AES-256-CBC';
    $code = preg_replace('/<\?(php)?|\?>/i', '', $code);
    $level = $_POST['level'] + 1;
    $encData = openssl_encrypt($code, $cipher, $key, 0, 'ABCDEF0123456789');
    $encoded_code = '<?php $encData = \'' . $encData . '\'; ' . 'eval(openssl_decrypt($encData, \'' . $cipher . '\', \'' . $key .  '\', 0, \'ABCDEF0123456789\')); ?>';
} ?>
<!DOCTYPE html>
<html>

<head>
    <title>Enkripsi Kode PHP</title>
</head>

<body>
    <h1>Enkripsi Kode PHP</h1>
    <form method="post" action="">
        <label for="code">Masukkan kode PHP:</label>
        <br>
        <textarea id="code" name="code" cols="80" rows="20">
    <?php echo isset($encoded_code) ? $encoded_code : ''; ?>
  </textarea>
        <!-- textarea hidden -->
        <textarea id="code" name="encrypted_code" cols="80" rows="20" hidden><?php echo $encrypted_code; ?></textarea>
        <br>
        <input type="hidden" name="level" value="<?php echo isset($level)
                                                        ? $level
                                                        : 0; ?>">
        <?php if (isset($level)) { ?>
            <button type="submit">Enkripsi Ke Level <?php echo $level + 1; ?></button>
        <?php } else { ?>
            <button type="submit">Enkripsi</button>
        <?php } ?>
    </form>
</body>

</html>