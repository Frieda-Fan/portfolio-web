$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Speech

$root = Split-Path -Parent $PSScriptRoot
$raw = Join-Path $root "tmp\audio-raw"
New-Item -ItemType Directory -Force -Path $raw | Out-Null

$lines = [ordered]@{
    "product-management" = "Gestio Productorum"
    "architecture" = "Architectura"
    "landscape" = "Forma Terrae"
    "installation" = "Ars in Situ"
}

foreach ($entry in $lines.GetEnumerator()) {
    $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
    try {
        $synth.SelectVoice("Microsoft Zira Desktop")
        $synth.Rate = -3
        $synth.Volume = 100
        $path = Join-Path $raw ($entry.Key + ".wav")
        $synth.SetOutputToWaveFile($path)
        $synth.Speak($entry.Value)
    }
    finally {
        $synth.Dispose()
    }
}

Write-Output "Generated $($lines.Count) raw Latin title recordings in $raw"
