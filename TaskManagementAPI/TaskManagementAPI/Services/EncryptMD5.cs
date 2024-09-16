using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using System.Text;

namespace TaskManagementAPI.Services
{
    public class EncryptMD5Service(IConfiguration configuration)
    {
        private readonly string _hash = configuration.GetSection("EncryptionSettings").GetSection("HashKey").ToString() ?? "";
        public string Encrypt(string message)
        {
            byte[] data = UTF8Encoding.UTF8.GetBytes(message);

            MD5 md5 = MD5.Create();
            TripleDES tripledes = TripleDES.Create();

            tripledes.Key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(_hash));
            tripledes.Mode = CipherMode.ECB;

            ICryptoTransform transform = tripledes.CreateEncryptor();
            byte[] result = transform.TransformFinalBlock(data, 0, data.Length);

            return Convert.ToBase64String(result);
        }

        public string Decrypt(string messageEn)
        {
            byte[] data = Convert.FromBase64String(messageEn);

            MD5 md5 = MD5.Create();
            TripleDES tripledes = TripleDES.Create();

            tripledes.Key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(_hash));
            tripledes.Mode = CipherMode.ECB;

            ICryptoTransform transform = tripledes.CreateDecryptor();
            byte[] result = transform.TransformFinalBlock(data, 0, data.Length);

            return UTF8Encoding.UTF8.GetString(result);
        }
    }
}
