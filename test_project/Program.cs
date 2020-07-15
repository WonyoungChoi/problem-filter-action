using System;

namespace test_project
{
    class Program
    {
        static void Main(string[] args)
        {
            int x = 10;
            int y = 5;

            Console.WriteLine($"X={x}, Y={y}");

            var adder = new Adder {
              X = x,
              Y = y
            };
            Console.WriteLine($"Adder : {adder.Result}");

            var subtractor = new Subtractor {
              X = x,
              Y = y
            };
            Console.WriteLine($"Subtractor : {subtractor.Result}");
        }
    }
}
