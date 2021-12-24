using System;

namespace WotDashLab.Wot.Client.Contracts.Exceptions
{
    public class WgErrorException : Exception
    {
        public int Code { get; set; }

        public string Name { get; set; }

        public string Field { get; set; }

        public string Value { get; set; }

        public WgErrorException()
        {

        }

        public WgErrorException(int code, string name)
            : base(name)
        {
            Code = code;
            Name = name;
        }

        public WgErrorException(int code, string name, string field, string value)
            : this(code, name)
        {
            Field = field;
            Value = value;
        }

        public WgErrorException(int code, string name, string field, string value, Exception innerException)
            : base(name, innerException)
        {
            Code = code;
            Name = name;
            Field = field;
            Value = value;
        }
    }
}