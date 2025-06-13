<!DOCTYPE html>
<html>
<head>
    <title>Dekripsi Kode PHP</title>
</head>
<body>
    <h1>Dekripsi Kode PHP</h1>

    <form method="post">
        <label for="encData">Encrypted Data ($encData):</label><br>
        <textarea name="encData" rows="5" cols="100"><?php echo isset($_POST['encData']) ? htmlspecialchars($_POST['encData']) : ''; ?></textarea><br><br>

        <label for="key">Key:</label><br>
        <input type="text" name="key" value="<?php echo isset($_POST['key']) ? htmlspecialchars($_POST['key']) : ''; ?>" size="50"><br><br>

        <label for="iv">IV (default: ABCDEF0123456789):</label><br>
        <input type="text" name="iv" value="<?php echo isset($_POST['iv']) ? htmlspecialchars($_POST['iv']) : 'ABCDEF0123456789'; ?>" size="50"><br><br>

        <input type="submit" value="Dekripsi">
    </form>

    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $encData = $_POST['encData'] ?? '';
        $key = $_POST['key'] ?? '';
        $iv = $_POST['iv'] ?? 'ABCDEF0123456789';
        $cipher = 'AES-256-CBC';

        if (empty($encData) || empty($key)) {
            echo "<p style='color:red;'>Encrypted data dan key wajib diisi.</p>";
        } else {
            $decrypted = openssl_decrypt($encData, $cipher, $key, 0, $iv);
            if ($decrypted === false) {
                echo "<p style='color:red;'>Gagal mendekripsi. Cek kembali key atau data terenkripsi.</p>";
            } else {
                echo "<h2>Hasil Dekripsi:</h2>";
                echo "<pre>" . htmlspecialchars($decrypted) . "</pre>";
            }
        }
    }
    ?>
</body>
</html>
